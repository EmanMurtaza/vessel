import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md'
  showCount?: boolean
  count?: number
  className?: string
}

export function StarRating({
  rating,
  max = 5,
  size = 'sm',
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating)
          const partial = !filled && i < rating

          return (
            <svg
              key={i}
              className={cn(starSize, filled || partial ? 'text-clay' : 'text-line')}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {partial ? (
                <defs>
                  <linearGradient id={`star-grad-${i}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset={`${(rating % 1) * 100}%`} stopColor="currentColor" />
                    <stop
                      offset={`${(rating % 1) * 100}%`}
                      stopColor="var(--color-line)"
                    />
                  </linearGradient>
                </defs>
              ) : null}
              <path
                fill={partial ? `url(#star-grad-${i})` : 'currentColor'}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          )
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </div>
  )
}
