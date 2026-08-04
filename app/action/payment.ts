// app/actions/payment.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCheckout(plan: 'free' | 'pro-monthly' | 'pro-yearly'): Promise<{
  error?: string;
  success?: boolean;
  message?: string;
  checkoutUrl?: string;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to continue' };
  }

  // === FREE PLAN ===
  if (plan === 'free') {
    // Just update user metadata or create a free subscription record
    const { error } = await supabase
      .from('profiles')
      .update({ 
        subscription_plan: 'free',
        subscription_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error(error);
      return { error: 'Failed to activate free plan' };
    }

    revalidatePath('/dashboard');
    return { 
      success: true, 
      message: 'Free plan activated successfully!' 
    };
  }

  // === PAID PLANS (Pro Monthly & Yearly) ===
  const variantMap: Record<string, string> = {
    'pro-monthly': process.env.LEMONSQUEEZY_MONTHLY_VARIANT_ID!,
    'pro-yearly': process.env.LEMONSQUEEZY_YEARLY_VARIANT_ID!,
  };

  const variantId = variantMap[plan];

  if (!variantId) {
    return { error: 'Invalid plan selected' };
  }

  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                user_id: user.id,
                plan: plan,
              }
            }
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMONSQUEEZY_STORE_ID
              }
            },
            variant: {
              data: {
                type: "variants",
                id: variantId
              }
            }
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Lemon Squeezy Error:", data);
      return { error: data.errors?.[0]?.detail || 'Failed to create checkout' };
    }

    return { 
      success: true, 
      checkoutUrl: data.data.attributes.url 
    };

  } catch (error) {
    console.error(error);
    return { error: 'Something went wrong. Please try again.' };
  }
}