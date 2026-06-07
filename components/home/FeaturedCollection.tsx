'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBestsellers } from '@/data/products'
import { ProductCard } from '@/components/shop/ProductCard'

export function FeaturedCollection() {
  const featured = getBestsellers().slice(0, 4)

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section header — intentionally left-aligned, not centered */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">
              Bestsellers
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink leading-tight">
              Most loved.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-clay hover:text-clay-dark font-medium transition-colors duration-150 mb-2"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-clay font-medium"
          >
            View all objects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
