'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '@/store/cart'
import { CartItem } from '@/components/cart/CartItem'
import { formatPrice, FREE_SHIPPING_THRESHOLD, getShippingProgress } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function CartPage() {
  const { items, subtotal, _hydrated } = useCart()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8
  const total = subtotal + shipping
  const progress = getShippingProgress(subtotal)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  if (!_hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-line border-t-clay rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink mb-10">
        Your bag.
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center">
            <svg className="w-9 h-9 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <p className="font-display text-3xl font-light text-ink mb-2">Nothing here yet.</p>
            <p className="text-base text-muted">Add something considered.</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 h-12 px-7 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
          >
            Explore the collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
          {/* Cart items */}
          <div>
            {/* Free shipping progress */}
            <div className="bg-surface rounded-xs px-5 py-4 mb-6">
              <div className="flex justify-between text-xs text-muted mb-2">
                <span>
                  {remaining > 0
                    ? `Add ${formatPrice(remaining)} more for free shipping`
                    : '✓ You qualify for free shipping'}
                </span>
                <span>{formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
              </div>
              <div className="h-1 bg-line rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-clay rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            <ul>
              {items.map((item) => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </ul>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 text-sm text-muted hover:text-clay transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-surface rounded-xs border border-line p-6 flex flex-col gap-4">
              <h2 className="font-medium text-ink">Order summary</h2>

              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium text-ink">
                    {shipping === 0 ? (
                      <span className="text-clay">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-muted text-xs">Calculated at checkout</span>
                </div>
                <div className="border-t border-line pt-3 flex justify-between">
                  <span className="font-medium text-ink">Estimated total</span>
                  <span className="font-medium text-ink">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 h-12 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
              >
                Proceed to checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex flex-col gap-2 text-xs text-muted text-center">
                <p>Secure, encrypted checkout</p>
                <div className="flex items-center justify-center gap-2">
                  {['Visa', 'Mastercard', 'Amex', 'Apple Pay'].map((m) => (
                    <span key={m} className="border border-line rounded-xs px-1.5 py-0.5 text-[9px] font-medium text-muted">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
