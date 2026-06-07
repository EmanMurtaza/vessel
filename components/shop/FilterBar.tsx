'use client'

import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterState } from '@/types'

const categoryOptions = [
  { value: 'all', label: 'All Objects' },
  { value: 'drinking', label: 'Drinking' },
  { value: 'dining', label: 'Dining' },
  { value: 'living', label: 'Living' },
] as const

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
] as const

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: Partial<FilterState>) => void
  resultCount: number
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line mb-8">
      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by category">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange({ category: opt.value as FilterState['category'] })}
            className={cn(
              'h-8 px-4 text-xs font-medium rounded-xs transition-all duration-150',
              filters.category === opt.value
                ? 'bg-ink text-canvas'
                : 'bg-surface text-ink-2 hover:bg-surface-2 border border-line'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Right: count + sort */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs text-muted hidden sm:block">
          {resultCount} {resultCount === 1 ? 'object' : 'objects'}
        </span>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted" />
          <label htmlFor="sort-select" className="sr-only">
            Sort by
          </label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as FilterState['sort'] })}
            className="text-xs text-ink bg-transparent border-none outline-none cursor-pointer appearance-none pr-4 font-medium"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="w-3.5 h-3.5 rounded-none accent-clay"
          />
          In stock only
        </label>
      </div>
    </div>
  )
}
