'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-body font-medium tracking-wide transition-all duration-200 focus-visible:outline-clay disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      primary:
        'bg-clay text-white hover:bg-clay-dark active:scale-[0.98]',
      secondary:
        'bg-ink text-canvas hover:bg-ink-2 active:scale-[0.98]',
      ghost:
        'bg-transparent text-ink hover:bg-surface active:scale-[0.98]',
      outline:
        'bg-transparent text-ink border border-line hover:border-muted hover:bg-surface active:scale-[0.98]',
    }

    const sizes = {
      sm: 'h-8 px-4 text-xs rounded-xs gap-1.5',
      md: 'h-11 px-6 text-sm rounded-xs gap-2',
      lg: 'h-13 px-8 text-base rounded-xs gap-2',
    }

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="sr-only">Loading…</span>
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
