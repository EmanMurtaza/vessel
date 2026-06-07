'use client'

import { useState } from 'react'
import { ShoppingBag, Heart, Share2, RefreshCcw, Shield, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { VariantSelector } from './VariantSelector'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.available)?.value || product.variants[0]?.value
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0

  const lowStock = product.stock > 0 && product.stock <= 5

  const handleAddToCart = async () => {
    if (product.isSoldOut) return
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      variant: selectedVariant,
      image: product.images[0],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const accordionItems = [
    {
      id: 'description',
      title: 'About this piece',
      content: (
        <div className="whitespace-pre-line leading-relaxed">{product.description}</div>
      ),
    },
    {
      id: 'materials',
      title: 'Materials & dimensions',
      content: (
        <dl className="flex flex-col gap-3">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted mb-1">Materials</dt>
            <dd>{product.materials}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted mb-1">Dimensions</dt>
            <dd>{product.dimensions}</dd>
          </div>
        </dl>
      ),
    },
    {
      id: 'care',
      title: 'Care instructions',
      content: product.careInstructions,
    },
    {
      id: 'shipping',
      title: 'Shipping & returns',
      content: (
        <div className="flex flex-col gap-3">
          <p>Free shipping on orders over $95. Standard orders ship within 2–4 business days.</p>
          <p>Easy 30-day returns on unused items in original condition. See our full returns policy for details.</p>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.isSoldOut && <Badge variant="soldout">Sold out</Badge>}
        {product.isNew && <Badge variant="new">New arrival</Badge>}
        {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
        {product.compareAtPrice && <Badge variant="sale">On sale</Badge>}
      </div>

      {/* Name + price */}
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink leading-tight mb-3">
          {product.name}
        </h1>
        <p className="text-base text-muted leading-relaxed mb-4">{product.tagline}</p>

        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-medium text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-lg text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Reviews summary */}
        {avgRating > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <StarRating rating={avgRating} size="sm" />
            <a
              href="#reviews"
              className="text-xs text-muted hover:text-clay underline underline-offset-2 transition-colors"
            >
              {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-line" />

      {/* Short description */}
      <p className="text-sm text-ink-2 leading-relaxed">{product.shortDescription}</p>

      {/* Variant selector */}
      {product.variants.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selected={selectedVariant}
          onSelect={setSelectedVariant}
        />
      )}

      {/* Quantity + Add to cart */}
      <div className="flex flex-col sm:flex-row gap-3">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={product.stock}
          className="shrink-0"
        />
        <motion.button
          onClick={handleAddToCart}
          disabled={product.isSoldOut}
          whileTap={{ scale: 0.98 }}
          className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xs text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-clay text-white hover:bg-clay-dark"
        >
          {added ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to bag
            </>
          ) : product.isSoldOut ? (
            'Sold out'
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to bag
            </>
          )}
        </motion.button>
      </div>

      {/* Low stock warning */}
      {lowStock && !product.isSoldOut && (
        <p className="text-xs text-clay font-medium">
          Only {product.stock} left — order soon
        </p>
      )}

      {/* Trust microcopy */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-y border-line">
        {[
          { icon: Truck, text: 'Ships in 2–4 days' },
          { icon: RefreshCcw, text: 'Free 30-day returns' },
          { icon: Shield, text: 'Secure checkout' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-xs text-muted">
            <Icon className="w-3.5 h-3.5 text-clay shrink-0" strokeWidth={1.5} />
            {text}
          </div>
        ))}
      </div>

      {/* Accordion */}
      <Accordion items={accordionItems} />
    </div>
  )
}
