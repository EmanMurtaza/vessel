import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'new' | 'bestseller' | 'soldout' | 'sale'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-surface text-muted border border-line',
    new: 'bg-ink text-canvas',
    bestseller: 'bg-clay text-white',
    soldout: 'bg-surface text-muted line-through',
    sale: 'bg-clay-light text-ink',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded-xs',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
