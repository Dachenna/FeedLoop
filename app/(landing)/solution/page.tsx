import Link from 'next/link'
import { Button } from '@/components/ui/button'

const steps = [
  ['01', 'You already ask', 'A founder call, an onboarding email, a churn note. The questions exist. The record does not.'],
  ['02', 'The answers scatter', 'Google Forms into a sheet. Typeform into another tab. Nobody owns the Monday read.'],
  ['03', 'FeedLoop keeps the loop', 'One owner, one public link, one inbox, one Generate button for sentiment, themes, and next steps.'],
]

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <p className="text-xs uppercase tracking-widest text-emerald-400">Solution</p>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl font-medium tracking-tight">The form is not the decision.</h1>
        <p className="mt-5 max-w-2xl text-zinc-400 leading-relaxed">
          Product teams in the US, Canada, and Germany already collect feedback. The failure is the week after. FeedLoop is the place those answers stay, under your account, until you turn them into a brief.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-3 gap-8">
        {steps.map(([n, title, body]) => (
          <div key={n}>
            <p className="font-mono text-sm text-emerald-400">{n}</p>
            <h2 className="mt-2 text-xl font-medium">{title}</h2>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-medium">What this is not</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>Not a replacement for your CRM.</li>
            <li>Not a chart of vanity scores. The brief is themes and next steps from your own responses.</li>
            <li>Not a promise of a research team. You still decide what to ship.</li>
          </ul>
        </div>
      </section>
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-zinc-400">See the plans, or write if you need a team seat.</p>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-white/15">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-zinc-200">
              <Link href="/contact">Contact sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
