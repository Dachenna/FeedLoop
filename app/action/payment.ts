'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type CheckoutPlan = 'free' | 'pro-monthly' | 'pro-yearly' | 'pro' | 'team';

const PAYSTACK_INIT_URL = 'https://api.paystack.co/transaction/initialize';

function nairaToKobo(naira: number) {
  return Math.round(naira * 100);
}

function planAmountKobo(plan: Exclude<CheckoutPlan, 'free'>): number | null {
  if (plan === 'pro-monthly' || plan === 'pro') {
    const fromEnv = Number(process.env.PAYSTACK_PRO_MONTHLY_NGN);
    return nairaToKobo(Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 5000);
  }

  if (plan === 'pro-yearly') {
    const fromEnv = Number(process.env.PAYSTACK_PRO_YEARLY_NGN);
    return nairaToKobo(Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 50000);
  }

  if (plan === 'team') {
    const fromEnv = Number(process.env.PAYSTACK_TEAM_MONTHLY_NGN);
    return nairaToKobo(Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 15000);
  }

  return null;
}

function planLabel(plan: CheckoutPlan) {
  switch (plan) {
    case 'pro-yearly':
      return 'pro-yearly';
    case 'team':
      return 'team';
    case 'free':
      return 'free';
    default:
      return 'pro';
  }
}

function appUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export async function createCheckout(plan: CheckoutPlan): Promise<{
  error?: string;
  success?: boolean;
  message?: string;
  checkoutUrl?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to continue' };
  }

  if (plan === 'free') {
    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_plan: 'free',
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error('[Paystack] free plan update', error.message);
      return { error: 'Failed to activate free plan' };
    }

    revalidatePath('/dashboard');
    revalidatePath('/settings');
    return {
      success: true,
      message: 'Free plan activated successfully!',
    };
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return { error: 'Paystack is not configured. Add PAYSTACK_SECRET_KEY to .env.local' };
  }

  const amount = planAmountKobo(plan);
  if (!amount) {
    return { error: 'Invalid plan selected' };
  }

  const email = user.email;
  if (!email) {
    return { error: 'Your account needs an email before you can pay' };
  }

  const reference = `feedloop_${planLabel(plan)}_${user.id.slice(0, 8)}_${Date.now()}`;

  try {
    const response = await fetch(PAYSTACK_INIT_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount,
        currency: process.env.PAYSTACK_CURRENCY || 'NGN',
        reference,
        callback_url: `${appUrl()}/api/paystack/callback`,
        metadata: {
          user_id: user.id,
          plan: planLabel(plan),
          cancel_action: `${appUrl()}/settings`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.status) {
      console.error('[Paystack] initialize failed', data);
      return {
        error: data?.message || 'Failed to start Paystack checkout',
      };
    }

    return {
      success: true,
      checkoutUrl: data.data.authorization_url as string,
    };
  } catch (error) {
    console.error('[Paystack] initialize error', error);
    return { error: 'Something went wrong starting checkout. Try again.' };
  }
}
