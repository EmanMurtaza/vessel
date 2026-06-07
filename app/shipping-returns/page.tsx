import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'VESSEL shipping information and returns policy.',
}

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">Policies</p>
        <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-ink">
          Shipping &amp; Returns.
        </h1>
      </div>

      <div className="prose-body flex flex-col gap-10">
        <section>
          <h2 className="font-display text-2xl font-medium text-ink tracking-tight mb-4">Shipping</h2>
          <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
            <p>
              <strong className="text-ink">Domestic (US):</strong> Free standard shipping on all orders
              over $95. Orders under $95 ship for a flat $8. Express shipping (2–3 business days) is
              available for $18.
            </p>
            <p>
              <strong className="text-ink">Processing time:</strong> In-stock orders ship within 2–4
              business days. During November–December, allow up to 7 business days.
            </p>
            <p>
              <strong className="text-ink">International:</strong> We ship to Canada, UK, Australia, and
              select European countries. International shipping rates are calculated at checkout. Import
              duties and taxes are the responsibility of the customer.
            </p>
            <p>
              <strong className="text-ink">Tracking:</strong> A tracking number is emailed to you when
              your order ships. Allow 24 hours for tracking information to update.
            </p>
          </div>
        </section>

        <div className="border-t border-line" />

        <section>
          <h2 className="font-display text-2xl font-medium text-ink tracking-tight mb-4">Returns</h2>
          <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
            <p>
              We accept returns on unused, unwashed items in original condition within 30 days of
              delivery. To initiate a return, email hello@vessel.co with your order number and the
              reason for return.
            </p>
            <p>
              <strong className="text-ink">Return shipping:</strong> Customers are responsible for return
              shipping costs unless the item arrived damaged or was incorrectly sent. We recommend
              using a tracked service for returns.
            </p>
            <p>
              <strong className="text-ink">Refunds:</strong> Once we receive and inspect the return, we
              issue a full refund to the original payment method within 5–7 business days.
            </p>
            <p>
              <strong className="text-ink">Damaged items:</strong> If your order arrives damaged, email
              us within 7 days of delivery with photos of the damage and packaging. We will send a
              replacement or issue a full refund — your choice.
            </p>
            <p>
              <strong className="text-ink">Non-returnable:</strong> Final sale items, custom orders, and
              gift card codes cannot be returned.
            </p>
          </div>
        </section>

        <div className="border-t border-line" />

        <section>
          <h2 className="font-display text-2xl font-medium text-ink tracking-tight mb-4">Questions?</h2>
          <p className="text-sm text-muted">
            Email us at{' '}
            <a href="mailto:hello@vessel.co" className="text-clay underline underline-offset-2">
              hello@vessel.co
            </a>{' '}
            or visit our{' '}
            <a href="/contact" className="text-clay underline underline-offset-2">
              contact page
            </a>
            . We reply within one business day.
          </p>
        </section>
      </div>
    </div>
  )
}
