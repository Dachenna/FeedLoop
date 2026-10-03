'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const company = String(data.get('company') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`FeedLoop sales — ${company || name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`)
    window.location.href = `mailto:hello@feedloop.app?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400">Contact sales</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">Talk to the person who builds it.</h1>
          <p className="mt-5 text-zinc-400 leading-relaxed">
            Team seats, a pilot for a product org, or a question about USD checkout. This goes to David, not a ticket queue. Use the form or write hello@feedloop.app.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-zinc-400">
            <li>US, Canada, Germany: dollar plans.</li>
            <li>Nigeria: naira checkout is already the local path.</li>
            <li>No demo theater. If the app is up, you can sign up and build a survey first.</li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
          <label className="block text-sm">
            Name
            <input name="name" required className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400/50" />
          </label>
          <label className="block text-sm">
            Work email
            <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400/50" />
          </label>
          <label className="block text-sm">
            Company
            <input name="company" className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400/50" />
          </label>
          <label className="block text-sm">
            What do you need?
            <textarea name="message" required rows={5} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400/50" />
          </label>
          <Button type="submit" className="bg-white text-black hover:bg-zinc-200">
            Open email
          </Button>
          {sent && <p className="text-xs text-zinc-500">Your mail app should open with the note filled in. Send it from there.</p>}
        </form>
      </section>
    </main>
  )
}
