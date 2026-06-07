'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/data/products'
import { ProductCard } from './ProductCard'
import { FilterBar } from './FilterBar'
import type { FilterState } from '@/types'

export function ProductGrid() {
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get('category') || 'all'

  const [filters, setFilters] = useState<FilterState>({
    category: urlCategory as FilterState['category'],
    priceRange: [0, 500],
    sort: 'featured',
    inStockOnly: false,
  })

  // Sync category from URL when it changes (e.g. navigating from /shop?category=dining to /shop)
  useEffect(() => {
    setFilters((f) => ({ ...f, category: urlCategory as FilterState['category'] }))
  }, [urlCategory])

  const handleFilterChange = (update: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...update }))
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => !p.isSoldOut && p.stock > 0)
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew))
        break
      default:
        // featured: bestsellers first
        result = result.filter((p) => p.isBestseller).concat(result.filter((p) => !p.isBestseller))
    }

    return result
  }, [filters])

  return (
    <div>
      <FilterBar filters={filters} onChange={handleFilterChange} resultCount={filtered.length} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <p className="font-display text-3xl text-muted font-light">Nothing found.</p>
          <p className="text-sm text-muted">Try adjusting your filters.</p>
          <button
            onClick={() => setFilters((f) => ({ ...f, category: 'all', inStockOnly: false }))}
            className="text-sm text-clay underline underline-offset-2 hover:text-clay-dark transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
