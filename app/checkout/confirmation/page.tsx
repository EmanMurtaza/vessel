'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const orderId = params.get('order') || 'VSL-XXXXXX'

  return (
    <div className="max-w-lg mx-auto text-center py-20 px-6">
      <div className="w-16 h-16 rounded-full bg-clay/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-clay" />
      </div>

      <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">
        Order confirmed
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink mb-4">
        Thank you.
      </h1>
      <p className="text-base text-muted leading-relaxed mb-8">
        Your order <strong className="text-ink font-medium">{orderId}</strong> has been received
        and is being prepared. You&rsquo;ll receive a confirmation email shortly.
      </p>

      {/* Next steps */}
      <div className="flex flex-col gap-3 text-left bg-surface rounded-sm p-6 mb-8">
        {[
          {
            icon: Mail,
            title: 'Check your email',
            body: 'A confirmation with your order details is on its way.',
          },
          {
            icon: Package,
            title: 'Ships in 2–4 days',
            body: 'You\'ll receive a tracking number when your order ships.',
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-xs bg-canvas flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-clay" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{title}</p>
              <p className="text-xs text-muted mt-0.5">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
        >
          Continue shopping <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/account"
          className="inline-flex items-center justify-center h-12 px-7 border border-line text-sm font-medium rounded-xs text-ink hover:bg-surface transition-all duration-200"
        >
          View order history
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
