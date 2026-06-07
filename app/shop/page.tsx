import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductGrid } from '@/components/shop/ProductGrid'

export const metadata: Metadata = {
  title: 'Shop All Ceramics',
  description:
    'Browse the full VESSEL collection — handcrafted stoneware mugs, bowls, vases, plates, and serving pieces made in small batches.',
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="aspect-[4/5] rounded-xs bg-surface animate-pulse" />
          <div className="h-4 w-3/4 bg-surface rounded-xs animate-pulse" />
          <div className="h-3 w-1/2 bg-surface rounded-xs animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
      <div className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">
          The collection
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-ink leading-tight">
          All objects.
        </h1>
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  )
}
