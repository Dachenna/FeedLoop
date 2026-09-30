'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Check,
  ArrowRight,
  BarChart3,
  MessageSquareText,
  Sparkles,
  Share2,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { BackgroundCircles } from '@/components/ui/BGcircles/background-circles'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { createCheckout } from '@/app/action/payment'
import { notify } from '@/lib/notify'

const features = [
  {
    icon: MessageSquareText,
    title: 'Surveys that match the question',
    body: 'NPS, CSAT, ratings, and open text in one builder. Publish a public link. Respondents never see your dashboard.',
    span: 'md:col-span-2',
  },
  {
    icon: BarChart3,
    title: 'One inbox',
    body: 'Every answer lands under the survey you own. Open a row. Read the exact answers.',
    span: '',
  },
  {
    icon: Sparkles,
    title: 'AI brief on demand',
    body: 'Analytics reads saved responses and returns sentiment, themes, and three next steps. Server-side. Not on every submit.',
    span: '',
  },
  {
    icon: Share2,
    title: 'Share without another tool',
    body: 'Copy /survey/[id]. WhatsApp, email, or X. No account for the person filling it.',
    span: '',
  },
  {
    icon: Wallet,
    title: 'Paystack, priced in naira',
    body: 'Cards and local methods your market already uses. No surprise USD checkout.',
    span: '',
  },
  {
    icon: ShieldCheck,
    title: 'Owner-scoped data',
    body: 'Other accounts cannot read your responses. AI runs only after you click Generate.',
    span: 'md:col-span-2',
  },
]

const comparison = [
  ['Job', 'FeedLoop', 'Google Forms / Typeform'],
  ['Collect answers', 'Custom surveys + public link', 'Yes'],
  ['NPS / CSAT', 'Built in', 'You assemble it'],
  ['Owner dashboard', 'Surveys, responses, analytics', 'Sheet or extra product'],
  ['AI themes + next steps', 'On-demand from your answers', 'Usually a paid add-on'],
  ['Checkout', 'Paystack / NGN', 'US/EU processors'],
]

const faqs = [
  {
    q: 'Is this just another form builder?',
    a: 'No. The form is intake. The product is the loop: collect, store under your account, then turn the pile into a decision.',
  },
  {
    q: 'Who is it for?',
    a: 'Founders and small product teams who already talk to users on WhatsApp and need those answers to become a weekly brief.',
  },
  {
    q: 'Do respondents need an account?',
    a: 'No. They open the public survey link and submit. Only you sign in.',
  },
  {
    q: 'When does AI run?',
    a: 'When you click Generate on Analytics. It does not run on every submit.',
  },
]

function ProductFrame() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="relative rounded-2xl border border-white/10 bg-zinc-900/80 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="ml-3 text-[11px] text-zinc-500 font-mono">app.feedloop / analytics</span>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          <div className="p-5 bg-zinc-950">
            <p className="text-[11px] uppercase tracking-wider text-zinc-500">Sentiment</p>
            <p className="mt-2 text-2xl font-medium text-white">Mixed</p>
            <p className="mt-1 text-xs text-zinc-500">40 responses this week</p>
          </div>
          <div className="p-5 bg-zinc-950">
            <p className="text-[11px] uppercase tracking-wider text-zinc-500">Top theme</p>
            <p className="mt-2 text-2xl font-medium text-white">Save button</p>
            <p className="mt-1 text-xs text-zinc-500">12 mentions</p>
          </div>
          <div className="p-5 bg-zinc-950">
            <p className="text-[11px] uppercase tracking-wider text-zinc-500">Next step</p>
            <p className="mt-2 text-lg font-medium text-emerald-400">Fix mobile save</p>
            <p className="mt-1 text-xs text-zinc-500">From AI brief</p>
          </div>
        </div>
        <div className="p-5 space-y-2 bg-zinc-950/80">
          {['"The save button does nothing on Android"', '"NPS 8 — love the form, hate the wait"', '"Need a WhatsApp share link"'].map((line) => (
            <div key={line} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-zinc-300">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [isYearly, setIsYearly] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)

  const handlePlanSelect = async (plan: 'free' | 'pro-monthly' | 'pro-yearly') => {
    setBusy(plan)
    try {
      const result = await createCheckout(plan)
      if (result.error) {
        notify.error(result.error)
        return
      }
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl
        return
      }
      notify.success(result.message || 'Free plan activated')
    } finally {
      setBusy(null)
    }
  }

  const proPrice = isYearly ? '50,000' : '5,000'
  const proPeriod = isYearly ? '/year' : '/month'

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden antialiased">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundCircles backgroundOnly className="opacity-25" />
      </div>

      <main className="relative z-10">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <div className="flex flex-col items-center text-center">
            <Link
              href="#product"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Survey builder, inbox, and AI brief in one product
              <ArrowRight className="h-3 w-3" />
            </Link>
            <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
              Stop collecting feedback you never read.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
              FeedLoop is the survey, the inbox, and the AI brief.
              Build NPS or custom questions, share a public link, then turn answers into themes before the next standup.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
              <Button asChild size="lg" className="h-12 px-8 rounded-lg bg-white text-black hover:bg-zinc-200">
                <Link href="/auth/signup">
                  Create your first survey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 px-8 text-zinc-300 hover:text-white hover:bg-white/10">
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-zinc-500">Free: 3 surveys. Pro via Paystack.</p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <ProductFrame />
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              ['What you build', 'NPS, CSAT, ratings, text'],
              ['What they see', 'A public form only'],
              ['What you get', 'Inbox + AI brief'],
              ['How you pay', 'Paystack, NGN'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">{k}</p>
                <p className="mt-1 font-medium text-zinc-200">{v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400">The job</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight">Most teams have a form. They do not have a loop.</h2>
            <p className="mt-5 text-zinc-400 leading-relaxed">
              Answers sit in a sheet. Nobody owns the weekly read. The next feature is a guess.
              FeedLoop is one owner, one inbox, one generate button.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-zinc-300">
              {['The form is not the product.', 'A chart of scores is not a Monday decision.', 'If checkout is only Stripe, half your market never starts.'].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none hidden lg:block" />
            <ProductFrame />
          </div>
        </section>

        <section id="product" className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <h2 className="text-3xl font-medium tracking-tight">What is in the product today</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">Not a mock catalog. These are the surfaces in the app.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`${f.span} rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors`}
              >
                <f.icon className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-4 font-medium text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-medium tracking-tight">How a loop runs</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {[
                ['01', 'Create the survey', 'Name it, add questions, set it live.'],
                ['02', 'Send the public link', 'Anyone with /survey/[id] can answer.'],
                ['03', 'Generate the brief', 'Responses land in the inbox. Analytics writes the next steps.'],
              ].map(([n, t, b]) => (
                <div key={n}>
                  <p className="font-mono text-sm text-emerald-400">{n}</p>
                  <h3 className="mt-2 text-xl font-medium">{t}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="text-3xl font-medium tracking-tight">Where FeedLoop is different</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  {comparison[0].map((h) => (
                    <th key={h} className="text-left font-medium p-4 border-b border-white/10">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.slice(1).map((row) => (
                  <tr key={row[0]} className="border-b border-white/10 last:border-0">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4 ${i === 1 ? 'text-emerald-300' : 'text-zinc-400'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <Card className="border-white/10 bg-white/[0.03]">
            <CardContent className="p-8 md:p-10">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Founder note</p>
              <h2 className="mt-2 text-2xl font-medium">Built in public from Nigeria, for teams that cannot wait on a US billing stack.</h2>
              <p className="mt-4 text-zinc-400 leading-relaxed max-w-3xl">
                Survey builder, public form, response inbox, NVIDIA-backed insights, Paystack checkout.
                I would rather show the working loop than invent logos. If you already ask users questions and lose the answers, this is the product.
              </p>
              <p className="mt-6 text-sm font-medium">David — FeedLoop</p>
            </CardContent>
          </Card>
        </section>

        <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-medium tracking-tight">Pricing</h2>
              <p className="mt-2 text-zinc-400">Naira. Paystack. No surprise conversion.</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className={!isYearly ? 'text-white' : 'text-zinc-500'}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={isYearly ? 'text-white' : 'text-zinc-500'}>Yearly</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border-white/10 bg-white/[0.03]">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-sm text-zinc-400">Free</p>
                <p className="mt-2 text-3xl font-medium">₦0</p>
                <ul className="mt-6 space-y-2 text-sm flex-1 text-zinc-300">
                  {['3 surveys', '50 responses / month', 'Public links', 'Response inbox'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-400" />{x}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant="outline" disabled={busy === 'free'} onClick={() => handlePlanSelect('free')}>
                  {busy === 'free' ? 'Working…' : 'Start free'}
                </Button>
              </CardContent>
            </Card>
            <Card className="relative border-emerald-400/40 bg-emerald-500/5 ring-1 ring-emerald-400/30">
              <span className="absolute -top-3 left-6 text-[11px] uppercase tracking-wider bg-emerald-400 text-black px-2 py-0.5 rounded-full font-medium">Recommended</span>
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-sm text-emerald-300">Pro</p>
                <p className="mt-2 text-3xl font-medium">
                  ₦{proPrice}<span className="text-base font-normal text-zinc-500">{proPeriod}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm flex-1 text-zinc-300">
                  {['50 surveys', '2,000 responses / month', 'AI insights', 'Paystack billing'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-400" />{x}</li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full bg-white text-black hover:bg-zinc-200"
                  disabled={!!busy}
                  onClick={() => handlePlanSelect(isYearly ? 'pro-yearly' : 'pro-monthly')}
                >
                  {busy ? 'Redirecting…' : 'Continue to Paystack'}
                </Button>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/[0.03]">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-sm text-zinc-400">Team</p>
                <p className="mt-2 text-3xl font-medium">₦15,000<span className="text-base font-normal text-zinc-500">/month</span></p>
                <ul className="mt-6 space-y-2 text-sm flex-1 text-zinc-300">
                  {['Unlimited surveys', '10,000 responses / month', 'AI insights', '5 seats'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-400" />{x}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant="outline" asChild>
                  <Link href="/auth/signup">Start Team</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
          <h2 className="text-3xl font-medium tracking-tight">Questions</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-white/10 pb-6">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-medium">Send the next survey today.</h2>
              <p className="mt-2 text-zinc-400">Publish a link. Generate the brief when answers arrive.</p>
            </div>
            <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200">
              <Link href="/auth/signup">Get started</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
