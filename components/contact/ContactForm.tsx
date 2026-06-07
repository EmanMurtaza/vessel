'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <CheckCircle className="w-8 h-8 text-clay" />
        <h2 className="font-display text-3xl font-light text-ink">Message received.</h2>
        <p className="text-base text-muted">Thanks for reaching out. We reply within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Input label="First name" required autoComplete="given-name" />
        <Input label="Last name" required autoComplete="family-name" />
      </div>
      <Input label="Email" type="email" required autoComplete="email" />
      <Input label="Order number (optional)" hint="If your query is about an existing order" />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-ink-2">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          className="w-full rounded-xs border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted resize-none focus:outline-none focus:ring-1 focus:ring-clay focus:border-clay transition-colors duration-150"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start h-12 px-8 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200 disabled:opacity-60 flex items-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  )
}
