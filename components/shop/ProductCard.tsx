'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { useCart } from '@/store/cart'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageIdx, setImageIdx] = useState(0)
  const [adding, setAdding] = useState(false)
  const { addItem } = useCart()

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0

  const defaultVariant = product.variants.find((v) => v.available)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!defaultVariant || product.isSoldOut) return
    setAdding(true)
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      variant: defaultVariant.value,
      image: product.images[0],
    })
    await new Promise((r) => setTimeout(r, 600))
    setAdding(false)
  }

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-surface mb-3">
          <Image
            src={product.images[imageIdx]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover: second image */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isSoldOut && <Badge variant="soldout">Sold out</Badge>}
            {product.isNew && !product.isSoldOut && <Badge variant="new">New</Badge>}
            {product.isBestseller && !product.isSoldOut && !product.isNew && (
              <Badge variant="bestseller">Bestseller</Badge>
            )}
            {product.compareAtPrice && !product.isSoldOut && (
              <Badge variant="sale">Sale</Badge>
            )}
          </div>

          {/* Quick add — appears on hover */}
          {!product.isSoldOut && defaultVariant && (
            <motion.button
              onClick={handleQuickAdd}
              initial={{ opacity: 0, y: 8 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 h-9 bg-canvas/95 backdrop-blur-sm text-ink text-xs font-medium rounded-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-clay hover:text-white"
              aria-label={`Quick add ${product.name} to bag`}
            >
              {adding ? (
                <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Quick add
                </>
              )}
            </motion.button>
          )}

          {product.isSoldOut && (
            <div className="absolute inset-0 bg-canvas/40" />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          {/* Variant color dots */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mb-0.5">
              {product.variants.slice(0, 4).map((v) => (
                <div
                  key={v.value}
                  className="w-2.5 h-2.5 rounded-full border border-line"
                  style={{
                    backgroundColor:
                      v.value === 'Bone White'
                        ? '#F0ECE4'
                        : v.value === 'Sage'
                        ? '#7A927A'
                        : v.value === 'Terracotta'
                        ? '#C4724A'
                        : v.value === 'Slate'
                        ? '#6B7280'
                        : '#D0C8BC',
                  }}
                  title={v.value}
                />
              ))}
              {product.variants.length > 4 && (
                <span className="text-[10px] text-muted">+{product.variants.length - 4}</span>
              )}
            </div>
          )}

          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-ink leading-snug group-hover:text-clay transition-colors duration-150 truncate">
                {product.name}
              </h3>
              {avgRating > 0 && (
                <div className="mt-1">
                  <StarRating
                    rating={avgRating}
                    showCount
                    count={product.reviews.length}
                  />
                </div>
              )}
            </div>
            <div className="shrink-0 text-right">
              {product.compareAtPrice && (
                <span className="block text-xs text-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className={`text-sm font-medium ${product.isSoldOut ? 'text-muted' : 'text-ink'}`}>
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
