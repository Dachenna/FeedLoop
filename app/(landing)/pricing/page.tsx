import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    note: 'For the first survey',
    items: ['3 surveys', '50 responses / month', 'Public links', 'Response inbox'],
    href: '/auth/signup',
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9',
    note: 'per month, or $90 a year',
    items: ['50 surveys', '2,000 responses / month', 'AI insights', 'Card checkout'],
    href: '/auth/signup',
    cta: 'Start Pro',
    featured: true,
  },
  {
    name: 'Team',
    price: '$29',
    note: 'per month',
    items: ['Unlimited surveys', '10,000 responses / month', 'AI insights', '5 seats'],
    href: '/contact',
    cta: 'Talk to sales',
    featured: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <p className="text-xs uppercase tracking-widest text-emerald-400">Pricing</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight">USD, listed in public.</h1>
        <p className="mt-5 max-w-2xl text-zinc-400 leading-relaxed">
          Built for teams in the United States, Canada, and Germany. Nigerian cards can still pay the naira equivalent. International dollar checkout turns on after Paystack approves it. The prices below are the prices.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 grid md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 flex flex-col ${
              plan.featured ? 'border-emerald-400/40 bg-emerald-500/5 ring-1 ring-emerald-400/30' : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <p className={plan.featured ? 'text-sm text-emerald-300' : 'text-sm text-zinc-400'}>{plan.name}</p>
            <p className="mt-2 text-3xl font-medium">{plan.price}</p>
            <p className="text-sm text-zinc-500">{plan.note}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-300 flex-1">
              {plan.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className={plan.featured ? 'mt-6 bg-white text-black hover:bg-zinc-200' : 'mt-6'} variant={plan.featured ? 'default' : 'outline'}>
              <Link href={plan.href}>{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </section>
    </main>
  )
}
