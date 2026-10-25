import { createHmac, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type PaystackEvent = {
  event?: string
  data?: {
    status?: string
    reference?: string
    amount?: number
    customer?: { email?: string }
    metadata?: { plan?: string; user_id?: string }
    plan?: { name?: string; interval?: string }
  }
}

function planFromEvent(data: PaystackEvent['data']): string {
  const fromMeta = data?.metadata?.plan
  if (fromMeta) return fromMeta

  const name = (data?.plan?.name || '').toLowerCase()
  if (name.includes('year')) return 'pro-yearly'
  if (name.includes('team')) return 'team'
  if (name.includes('pro')) return 'pro'
  return 'pro'
}

export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ error: 'Paystack is not configured' }, { status: 500 })
  }

  const raw = await request.text()
  const signature = request.headers.get('x-paystack-signature') || ''
  const expected = createHmac('sha512', secret).update(raw).digest('hex')

  const valid =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))

  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(raw) as PaystackEvent
  if (event.event !== 'charge.success' || event.data?.status !== 'success') {
    return NextResponse.json({ received: true })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!serviceKey || !url) {
    console.error('[Paystack webhook] missing SUPABASE_SERVICE_ROLE_KEY')
    return NextResponse.json({ error: 'Supabase admin is not configured' }, { status: 500 })
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const email = event.data.customer?.email
  const userId = event.data.metadata?.user_id
  let profileId = userId

  if (!profileId && email) {
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
    if (error) {
      console.error('[Paystack webhook] list users', error.message)
      return NextResponse.json({ error: 'Could not match customer' }, { status: 500 })
    }
    profileId = data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase())?.id
  }

  if (!profileId) {
    console.error('[Paystack webhook] no matching user', email)
    return NextResponse.json({ received: true, matched: false })
  }

  const plan = planFromEvent(event.data)
  const { error } = await admin
    .from('profiles')
    .update({
      subscription_plan: plan,
      subscription_status: 'active',
      paystack_reference: event.data.reference,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileId)

  if (error) {
    console.error('[Paystack webhook] profile update', error.message)
    return NextResponse.json({ error: 'Profile update failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true, plan })
}
