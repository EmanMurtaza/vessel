'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const btnSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const textSize = size === 'sm' ? 'text-xs w-8' : 'text-sm w-10'
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <div
      className={cn(
        'inline-flex items-center border border-line rounded-xs',
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          btnSize,
          'flex items-center justify-center text-muted hover:text-ink disabled:opacity-30 transition-colors duration-150'
        )}
      >
        <Minus className={iconSize} />
      </button>
      <span
        className={cn(
          textSize,
          'text-center font-medium text-ink tabular-nums'
        )}
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          btnSize,
          'flex items-center justify-center text-muted hover:text-ink disabled:opacity-30 transition-colors duration-150'
        )}
      >
        <Plus className={iconSize} />
      </button>
    </div>
  )
}
