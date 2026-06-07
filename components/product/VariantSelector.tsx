'use client'

import { cn } from '@/lib/utils'
import type { ProductVariant } from '@/types'

const colorMap: Record<string, string> = {
  'Bone White': '#F0ECE4',
  Sage: '#7A927A',
  Terracotta: '#C4724A',
  Slate: '#6B7280',
}

interface VariantSelectorProps {
  variants: ProductVariant[]
  selected: string
  onSelect: (value: string) => void
}

export function VariantSelector({ variants, selected, onSelect }: VariantSelectorProps) {
  const isColor = variants.every((v) => v.type === 'color')

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          {isColor ? 'Colour' : 'Size'}
        </span>
        <span className="text-xs text-ink font-medium">{selected}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.value === selected
          const isUnavailable = !variant.available

          if (isColor) {
            return (
              <button
                key={variant.value}
                onClick={() => !isUnavailable && onSelect(variant.value)}
                disabled={isUnavailable}
                title={variant.value}
                aria-label={`Select colour: ${variant.value}${isUnavailable ? ' (unavailable)' : ''}`}
                aria-pressed={isSelected}
                className={cn(
                  'relative w-8 h-8 rounded-full border-2 transition-all duration-150',
                  isSelected ? 'border-clay ring-1 ring-clay ring-offset-1' : 'border-transparent hover:border-muted',
                  isUnavailable && 'opacity-40 cursor-not-allowed'
                )}
              >
                <span
                  className="absolute inset-0.5 rounded-full"
                  style={{ backgroundColor: colorMap[variant.value] || '#D0C8BC' }}
                />
                {isUnavailable && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-px h-6 bg-muted/60 rotate-45 block" />
                  </span>
                )}
              </button>
            )
          }

          return (
            <button
              key={variant.value}
              onClick={() => !isUnavailable && onSelect(variant.value)}
              disabled={isUnavailable}
              aria-pressed={isSelected}
              className={cn(
                'h-9 px-4 text-xs font-medium rounded-xs border transition-all duration-150',
                isSelected
                  ? 'bg-ink text-canvas border-ink'
                  : 'bg-canvas text-ink border-line hover:border-muted',
                isUnavailable && 'opacity-40 cursor-not-allowed line-through'
              )}
            >
              {variant.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}
