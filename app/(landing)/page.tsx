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
import { motion, Variants } from 'framer-motion'
import { BackgroundCircles } from '@/components/ui/BGcircles/background-circles'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { createCheckout } from '@/app/action/payment'
import { notify } from '@/lib/notify'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 16 },
  },
}

const features = [
  {
    icon: MessageSquareText,
    title: 'Surveys that match the question',
    body: 'Build NPS, CSAT, ratings, and open questions in one builder. Publish a public link. Respondents never see your dashboard.',
  },
  {
    icon: BarChart3,
    title: 'Responses in one inbox',
    body: 'Every answer lands under the survey you own. Filter by survey, open a response, and see the exact answers people submitted.',
  },
  {
    icon: Sparkles,
    title: 'AI that turns answers into actions',
    body: 'One click on Analytics. FeedLoop reads the responses and returns sentiment, themes, and three next steps. The model runs on the server, not in the form.',
  },
  {
    icon: Share2,
    title: 'Share without another tool',
    body: 'Copy the survey URL. Send it on WhatsApp, email, or X. No Typeform account for the person filling it.',
  },
  {
    icon: Wallet,
    title: 'Pay where your customers already pay',
    body: 'Checkout is Paystack first. Prices in naira. Cards and local methods your Nigerian users already trust.',
  },
  {
    icon: ShieldCheck,
    title: 'Your data stays yours',
    body: 'Surveys are scoped to the signed-in owner. Other accounts cannot read your responses. AI only runs after you ask for it.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Create the survey',
    body: 'Name it, add questions, set status to live. The builder is the same admin sheet you already use.',
  },
  {
    n: '02',
    title: 'Send the public link',
    body: 'Anyone with /survey/[id] can answer. You stay in the dashboard.',
  },
  {
    n: '03',
    title: 'Read, then generate insights',
    body: 'Responses appear in the Responses tab. Analytics runs NVIDIA on the saved answers and writes the brief you show a founder.',
  },
]

const comparison = [
  ['Job to be done', 'FeedLoop', 'Google Forms / Typeform'],
  ['Collect answers', 'Yes — custom surveys + public link', 'Yes'],
  ['NPS / CSAT built in', 'Yes', 'You assemble it yourself'],
  ['Owner dashboard', 'Surveys, responses, analytics', 'Spreadsheet or extra product'],
  ['AI themes + next steps', 'On-demand from your responses', 'Usually a separate paid add-on'],
  ['Paystack / NGN checkout', 'Native', 'Card processors built for the US/EU'],
  ['Price after the form', 'You pay for insight, not just hosting a form', 'Cheap to collect, expensive to decide'],
]

const faqs = [
  {
    q: 'Is this just another form builder?',
    a: 'No. The form is the intake. The product is the loop: collect, store under your account, then turn the pile into a decision with AI.',
  },
  {
    q: 'Who is it for?',
    a: 'Founders and small product teams who already talk to users on WhatsApp and need a place those answers become a weekly brief.',
  },
  {
    q: 'Do respondents need an account?',
    a: 'No. They open the public survey link and submit. Only you sign in.',
  },
  {
    q: 'When does AI run?',
    a: 'When you click Generate on Analytics. It does not run on every submit, so it will not burn your quota on spam.',
  },
  {
    q: 'How do I pay?',
    a: 'Free plan is instant. Pro and Team open Paystack checkout in naira, then return to Settings after verification.',
  },
]

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
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden antialiased">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundCircles backgroundOnly className="opacity-30" />
      </div>

      <main className="relative z-10">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={itemVariants} className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Feedback software for founders who ship weekly
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-950 dark:text-white">
              Stop collecting feedback you never read.
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              FeedLoop is the survey, the inbox, and the AI brief in one product.
              Build NPS or custom questions, share a public link, then turn answers into themes and next steps before the next standup.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-11 px-6 bg-emerald-600 hover:bg-emerald-500 text-white">
                <Link href="/auth/signup">
                  Create your first survey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-6">
                <Link href="/auth/login">Sign in to the dashboard</Link>
              </Button>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-4 text-sm text-zinc-500">
              Free plan includes 3 surveys. Paystack checkout when you need Pro.
            </motion.p>
          </motion.div>
        </section>

        <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              ['What you build', 'NPS, CSAT, ratings, text'],
              ['What they see', 'A public form. Nothing else'],
              ['What you get', 'Inbox + AI brief'],
              ['How you pay', 'Paystack, priced in NGN'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-zinc-500 text-xs uppercase tracking-wide">{k}</p>
                <p className="mt-1 font-medium">{v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">The problem FeedLoop is built for</h2>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Most teams already have a form. They do not have a system.
            Answers sit in a sheet. Nobody owns the weekly read. The next feature is a guess.
            FeedLoop is the system: one owner, one inbox, one generate button.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              ['The form is not the product', 'Google Forms collects. It does not tell you what to ship on Monday.'],
              ['Dashboards without context fail', 'A chart of 40 scores is not a decision. Themes and actions are.'],
              ['Global tools ignore how you get paid', 'If checkout is only Stripe, half your market never starts.'],
            ].map(([t, b]) => (
              <Card key={t} className="border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{b}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <h2 className="text-3xl font-semibold tracking-tight">What is inside the product today</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            This is not a mock. These are the surfaces in the app.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/70 dark:bg-zinc-900/50">
                <f.icon className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-950 text-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight">How a loop actually runs</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {steps.map((s) => (
                <div key={s.n}>
                  <p className="text-emerald-400 font-mono text-sm">{s.n}</p>
                  <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Where FeedLoop is different</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Typeform and Google Forms are good at asking. FeedLoop is built to close the loop after the ask.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  {comparison[0].map((h) => (
                    <th key={h} className="text-left font-semibold p-4 border-b border-zinc-200 dark:border-zinc-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.slice(1).map((row) => (
                  <tr key={row[0]} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4 align-top ${i === 1 ? 'text-emerald-800 dark:text-emerald-300 font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <Card className="border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-8 md:p-10">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Founder note</p>
              <h2 className="mt-2 text-2xl font-semibold">Built in public from Nigeria, for teams that cannot wait on a US billing stack.</h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                FeedLoop is a solo-built product: survey builder, public respondent form, response inbox, NVIDIA-backed insights, and Paystack checkout.
                I would rather show you the working loop than invent logos of companies that have not used it yet.
                If you are a founder who already asks users questions and loses the answers, this is the product.
              </p>
              <p className="mt-6 text-sm font-medium">David — FeedLoop</p>
            </CardContent>
          </Card>
        </section>

        <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Naira. Paystack. No surprise currency conversion.</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className={!isYearly ? 'font-medium' : 'text-zinc-500'}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={isYearly ? 'font-medium' : 'text-zinc-500'}>Yearly</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-sm text-zinc-500">Free</p>
                <p className="mt-2 text-3xl font-semibold">₦0</p>
                <ul className="mt-6 space-y-2 text-sm flex-1">
                  {['3 surveys', '50 responses / month', 'Public survey links', 'Response inbox'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-600" />{x}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant="outline" disabled={busy === 'free'} onClick={() => handlePlanSelect('free')}>
                  {busy === 'free' ? 'Working…' : 'Start free'}
                </Button>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/20">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Pro</p>
                <p className="mt-2 text-3xl font-semibold">
                  ₦{proPrice}<span className="text-base font-normal text-zinc-500">{proPeriod}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm flex-1">
                  {['50 surveys', '2,000 responses / month', 'AI insights', 'Paystack billing'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-600" />{x}</li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                  disabled={!!busy}
                  onClick={() => handlePlanSelect(isYearly ? 'pro-yearly' : 'pro-monthly')}
                >
                  {busy ? 'Redirecting…' : 'Continue to Paystack'}
                </Button>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-sm text-zinc-500">Team</p>
                <p className="mt-2 text-3xl font-semibold">₦15,000<span className="text-base font-normal text-zinc-500">/month</span></p>
                <ul className="mt-6 space-y-2 text-sm flex-1">
                  {['Unlimited surveys', '10,000 responses / month', 'AI insights', '5 seats'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-emerald-600" />{x}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant="outline" asChild>
                  <Link href="/auth/signup">Talk to start Team</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <h2 className="text-3xl font-semibold tracking-tight">Questions</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Send the next survey today.</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Create an account, publish a link, generate the brief when answers arrive.</p>
            </div>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white">
              <Link href="/auth/signup">Get started</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
