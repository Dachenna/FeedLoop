import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('reference');
  const origin = request.nextUrl.origin;

  if (!reference) {
    return NextResponse.redirect(new URL('/settings?billing=missing-ref', origin));
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.redirect(new URL('/settings?billing=not-configured', origin));
  }

  const verifyRes = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
      cache: 'no-store',
    }
  );

  const payload = await verifyRes.json();
  const paid =
    verifyRes.ok &&
    payload?.status === true &&
    payload?.data?.status === 'success';

  if (!paid) {
    console.error('[Paystack] verify failed', reference, payload);
    return NextResponse.redirect(new URL('/settings?billing=failed', origin));
  }

  const metadata = payload.data.metadata || {};
  const userId = metadata.user_id as string | undefined;
  const plan = (metadata.plan as string | undefined) || 'pro';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || (userId && user.id !== userId)) {
    return NextResponse.redirect(new URL('/auth/login?next=/settings', origin));
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_plan: plan,
      subscription_status: 'active',
      paystack_reference: reference,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('[Paystack] profile update', error.message);
    return NextResponse.redirect(new URL('/settings?billing=saved-failed', origin));
  }

  return NextResponse.redirect(new URL('/settings?billing=success', origin));
}
