import { cn } from '@/lib/utils'
import type { CheckoutStep } from '@/types'

const steps: { id: CheckoutStep; label: string }[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

interface ProgressStepsProps {
  current: CheckoutStep
}

export function ProgressSteps({ current }: ProgressStepsProps) {
  const currentIdx = steps.findIndex((s) => s.id === current)

  return (
    <nav aria-label="Checkout progress" className="flex items-center gap-0">
      {steps.map((step, i) => {
        const done = i < currentIdx
        const active = step.id === current

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-200',
                  done
                    ? 'bg-clay text-white'
                    : active
                    ? 'bg-ink text-canvas'
                    : 'bg-line text-muted'
                )}
              >
                {done ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:block',
                  active ? 'text-ink' : done ? 'text-clay' : 'text-muted'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'h-px w-8 sm:w-12 mx-2 transition-colors duration-300',
                  i < currentIdx ? 'bg-clay' : 'bg-line'
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
