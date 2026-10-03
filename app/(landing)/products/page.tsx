import Link from 'next/link'
import { Button } from '@/components/ui/button'

const surfaces = [
  {
    name: 'Survey builder',
    body: 'NPS, CSAT, ratings, and open text in one form. You name the survey, add questions, and set it live. Respondents never see the dashboard.',
  },
  {
    name: 'Public link',
    body: 'Each live survey has a URL. Email it, drop it in Slack, or send it after a call. The person answering does not need an account.',
  },
  {
    name: 'Response inbox',
    body: 'Answers land under the survey you own. Open a row and read the exact submission. Other accounts cannot read that table.',
  },
  {
    name: 'AI brief',
    body: 'On Analytics, Generate reads the saved responses and returns sentiment, themes, and three next steps. It runs when you click, not on every submit.',
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <p className="text-xs uppercase tracking-widest text-emerald-400">Products</p>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl font-medium tracking-tight">Four surfaces. One loop.</h1>
        <p className="mt-5 max-w-2xl text-zinc-400 leading-relaxed">
          FeedLoop is not a catalog of add-ons. These are the parts that exist in the app today: build the survey, share the link, read the inbox, generate the brief.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 grid md:grid-cols-2 gap-4">
        {surfaces.map((item) => (
          <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-medium">{item.name}</h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-medium">Start with one survey.</h2>
            <p className="mt-2 text-zinc-400">Free includes 3 surveys and the inbox. AI sits on Pro.</p>
          </div>
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/auth/signup">Create your first survey</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
