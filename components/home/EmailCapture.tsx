'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-20 md:py-28 bg-ink">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-canvas/40 mb-4 font-medium">
            Join the list
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-canvas leading-tight mb-4">
            10% off your
            <br />
            first order.
          </h2>
          <p className="text-base text-canvas/50 leading-relaxed mb-10">
            Subscribe for early access to new releases, studio notes, and that discount — no noise,
            no daily emails.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="flex gap-2 max-w-md"
              >
                <label htmlFor="email-subscribe" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-subscribe"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 h-12 px-4 bg-white/8 border border-white/15 rounded-xs text-sm text-canvas placeholder:text-canvas/30 focus:outline-none focus:border-clay-light focus:ring-1 focus:ring-clay-light transition-colors duration-150"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-5 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-colors duration-200 flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-clay-light shrink-0" />
                <p className="text-base text-canvas/80">
                  You&rsquo;re in. Check your inbox for 10% off.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-canvas/25 mt-4">
            Unsubscribe anytime. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
