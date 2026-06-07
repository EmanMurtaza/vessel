import { Package, RotateCcw, ShieldCheck, Star } from 'lucide-react'

const signals = [
  {
    icon: Package,
    title: 'Free Shipping',
    body: 'On all orders over $95',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    body: 'Easy, no-questions returns',
  },
  {
    icon: ShieldCheck,
    title: 'Made to Last',
    body: 'Kiln-fired stoneware, built for daily use',
  },
  {
    icon: Star,
    title: '4.9 Average Rating',
    body: 'From 1,200+ verified reviews',
  },
]

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-canvas" aria-label="Brand trust signals">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {signals.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-0 py-7 sm:px-6 border-r border-line last:border-r-0 first:pl-0 last:pr-0"
                style={{ borderRight: i < 3 ? undefined : 'none' }}
              >
                <div className="shrink-0 w-9 h-9 rounded-xs bg-surface flex items-center justify-center">
                  <Icon className="w-4 h-4 text-clay" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink leading-tight">{s.title}</p>
                  <p className="text-xs text-muted mt-0.5">{s.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
