import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-ink-2 uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-xs border bg-white px-4 text-sm text-ink placeholder:text-muted',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-1 focus:ring-clay focus:border-clay',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-line hover:border-muted',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-muted">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
