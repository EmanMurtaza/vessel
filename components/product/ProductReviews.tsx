import type { ProductReview } from '@/types'
import { StarRating } from '@/components/ui/StarRating'
import { formatDate } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

interface ProductReviewsProps {
  reviews: ProductReview[]
  productName: string
}

export function ProductReviews({ reviews, productName }: ProductReviewsProps) {
  if (reviews.length === 0) return null

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }))

  return (
    <section id="reviews" className="py-16 border-t border-line">
      <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-10">
        What people say
        <span className="text-muted font-light"> about {productName}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
        {/* Summary sidebar */}
        <div>
          <div className="flex items-end gap-3 mb-4">
            <span className="font-display text-6xl font-light text-ink leading-none">
              {avgRating.toFixed(1)}
            </span>
            <div className="mb-1">
              <StarRating rating={avgRating} size="md" />
              <p className="text-xs text-muted mt-1">{reviews.length} reviews</p>
            </div>
          </div>

          {/* Distribution bars */}
          <div className="flex flex-col gap-2">
            {distribution.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-muted w-3 shrink-0">{star}</span>
                <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-clay rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted w-5 text-right shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review list */}
        <div className="flex flex-col gap-8">
          {reviews.map((review) => (
            <article key={review.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <StarRating rating={review.rating} />
                  <h3 className="font-medium text-sm text-ink mt-2">{review.title}</h3>
                </div>
                <time className="text-xs text-muted shrink-0">{formatDate(review.date)}</time>
              </div>
              <p className="text-sm text-ink-2 leading-relaxed">{review.body}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="font-medium text-ink">{review.author}</span>
                <span>·</span>
                <span>{review.location}</span>
                {review.verified && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-clay">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified purchase
                    </span>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
