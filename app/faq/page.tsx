import type { Metadata } from 'next'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about VESSEL ceramics — ordering, shipping, care, and more.',
}

const faqItems = [
  {
    id: 'handmade',
    title: 'Are all pieces really handmade?',
    content:
      'Yes. Every piece is hand-thrown on a kick wheel, hand-trimmed, hand-glazed, and fired in our Portland studio kiln. No slip-casting, no molds for the main body. Small variations in form, surface, and glaze color are expected and considered part of the piece.',
  },
  {
    id: 'dishwasher',
    title: 'Are your ceramics dishwasher safe?',
    content:
      'Most pieces are dishwasher safe — mugs, bowls, plates, tumblers, and the butter dish. Vases, planters, and the oil carafe are hand-wash only. Each product page lists the specific care instructions. In general, hand washing extends the life of the glaze finish.',
  },
  {
    id: 'variations',
    title: 'My piece looks slightly different from the photos. Is this normal?',
    content:
      'Yes — and intentional. Each batch varies slightly in glaze tone, texture, and form. Product photos represent a typical piece from that run, not a guaranteed exact match. If you receive a piece that appears to have an actual defect (chip, crack, glaze pooling that affects function), contact us and we\'ll sort it out.',
  },
  {
    id: 'shipping-time',
    title: 'How long until my order ships?',
    content:
      'Most in-stock orders ship within 2–4 business days. During busy periods (November–December) please allow up to 7 business days. You\'ll receive a tracking number by email when your order has shipped.',
  },
  {
    id: 'free-shipping',
    title: 'Do you offer free shipping?',
    content:
      'Yes — free standard shipping on all US orders over $95. Express shipping is available for $18. International shipping is available to select countries; rates are calculated at checkout.',
  },
  {
    id: 'returns',
    title: 'What is your returns policy?',
    content:
      'We accept returns on unused items in original condition within 30 days of delivery. Items must be unwashed and undamaged. To start a return, email hello@vessel.co with your order number. We do not cover return shipping costs unless the item arrived damaged.',
  },
  {
    id: 'giftable',
    title: 'Can I add a gift message?',
    content:
      'Yes. During checkout, add a note in the order instructions field and we\'ll include a handwritten card. We also offer gift-ready packaging on the Dinner Set — Four for an additional $8.',
  },
  {
    id: 'custom',
    title: 'Do you do custom or wholesale orders?',
    content:
      'We do small-run custom orders for corporate gifts and restaurants, with a minimum of 24 pieces. For wholesale inquiries, email hello@vessel.co with details about your shop and what you\'re looking for.',
  },
  {
    id: 'restock',
    title: 'Will a sold-out item come back?',
    content:
      'Most items are restocked on a rolling basis as batches come out of the kiln — usually every 4–6 weeks. Some seasonal colorways are limited-run and won\'t return. If you\'d like to be notified when a specific item is restocked, email us and we\'ll add you to the waitlist.',
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">Help</p>
        <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-ink">
          FAQ.
        </h1>
      </div>

      <Accordion items={faqItems} allowMultiple />

      <div className="mt-12 pt-8 border-t border-line">
        <p className="text-sm text-muted">
          Still have a question?{' '}
          <a href="/contact" className="text-clay underline underline-offset-2 hover:text-clay-dark transition-colors">
            Get in touch
          </a>{' '}
          and we&rsquo;ll reply within one business day.
        </p>
      </div>
    </div>
  )
}
