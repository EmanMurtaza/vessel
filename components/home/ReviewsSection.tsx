'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { StarRating } from '@/components/ui/StarRating'

const reviews = [
  {
    id: 1,
    author: 'Maya L.',
    location: 'Portland, OR',
    rating: 5,
    quote:
      '"I\'ve been through so many mugs. This one stays on the counter. The weight is perfect — not too heavy, not flimsy. The sage glaze is even more beautiful in person than in photos."',
    product: 'Morning Mug — Sage',
  },
  {
    id: 2,
    author: 'Lena H.',
    location: 'Boston, MA',
    rating: 5,
    quote:
      '"I bought the Vessel Vase for my bedroom and I\'ve moved it to every room trying to decide where it looks best. It looks best everywhere."',
    product: 'Vessel Vase',
  },
  {
    id: 3,
    author: 'Emily C.',
    location: 'Washington, DC',
    rating: 5,
    quote:
      '"I\'ve now gifted the dinner set four times. Every single recipient has reached out to say it\'s their favourite thing in their kitchen."',
    product: 'Dinner Set — Four',
  },
]

export function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-1 mb-3">
            <StarRating rating={5} size="md" />
          </div>
          <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">
            1,200+ reviews
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink">
            What people say.
          </h2>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-surface rounded-sm p-7 flex flex-col gap-4"
            >
              <StarRating rating={review.rating} />
              <blockquote className="text-base text-ink-2 leading-relaxed flex-1">
                {review.quote}
              </blockquote>
              <div className="border-t border-line pt-4">
                <p className="text-sm font-medium text-ink">{review.author}</p>
                <p className="text-xs text-muted mt-0.5">
                  {review.location} · {review.product}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Press logos */}
        <div className="mt-14 pt-10 border-t border-line">
          <p className="text-center text-xs uppercase tracking-widest text-muted mb-7 font-medium">
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['Kinfolk', 'Sight Unseen', 'Domino', 'Remodelista', 'NY Times'].map((pub) => (
              <span
                key={pub}
                className="font-display text-base font-light tracking-tight text-muted/60 italic"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
