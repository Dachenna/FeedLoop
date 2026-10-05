import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <p className="text-xs uppercase tracking-widest text-emerald-400">About</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight">One builder. A working loop.</h1>
        <div className="mt-8 space-y-5 text-zinc-400 leading-relaxed">
          <p>
            FeedLoop is built by David, a web developer in Nigeria. There is no invented customer wall and no borrowed logo row. The product is the survey builder, the public form, the response inbox, and an on-demand AI brief.
          </p>
          <p>
            The first market is product teams in the United States, Canada, and Germany, because that is where a $9 tool gets paid. Nigerian teams can still sign up and pay in naira. The company is not a US entity yet. Checkout runs through Paystack.
          </p>
          <p>
            What is real today: create a survey, share the link, store responses under your account, generate a brief from those responses. What is still being finished: dollar payout approval, and seat billing for Team.
          </p>
          <p>
            If you need a vendor with a 40-person support desk, this is not that. If you need the answers you already collect to survive until Monday, it is.
          </p>
        </div>
        <p className="mt-8 text-sm font-medium text-white">David — FeedLoop</p>
        <Button asChild className="mt-8 bg-white text-black hover:bg-zinc-200">
          <Link href="/contact">Write to sales</Link>
        </Button>
      </section>
    </main>
  )
}
