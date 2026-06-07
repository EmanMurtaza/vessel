'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/store/cart'
import { formatPrice, FREE_SHIPPING_THRESHOLD, getShippingProgress } from '@/lib/utils'
import { QuantityStepper } from '@/components/ui/QuantityStepper'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const progress = getShippingProgress(subtotal)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/30"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-canvas flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-line">
              <h2 className="font-medium text-sm text-ink">
                Your Bag {itemCount > 0 && <span className="text-muted">({itemCount})</span>}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 -mr-2 text-muted hover:text-ink transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Free shipping bar */}
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 bg-surface border-b border-line">
                <div className="flex justify-between text-xs text-muted mb-1.5">
                  <span>
                    {remaining > 0
                      ? `${formatPrice(remaining)} away from free shipping`
                      : 'You qualify for free shipping!'}
                  </span>
                  <span>{formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
                </div>
                <div className="h-0.5 bg-line rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-clay rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 bg-surface border-b border-line">
                <p className="text-xs text-clay font-medium">✓ Free shipping applied</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center">
                    <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-ink mb-1">Your bag is empty</p>
                    <p className="text-sm text-muted">Add something considered.</p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center h-8 px-4 text-xs font-medium tracking-wide border border-line rounded-xs text-ink hover:bg-surface transition-all duration-200"
                  >
                    Explore the collection
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={item.cartItemId} className="flex gap-4">
                      <div className="relative w-20 h-24 shrink-0 rounded-xs overflow-hidden bg-surface">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="text-sm font-medium text-ink hover:text-clay transition-colors line-clamp-1"
                            onClick={closeCart}
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-muted mt-0.5">{item.variant}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(q) => updateQuantity(item.cartItemId, q)}
                            size="sm"
                          />
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-ink">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              aria-label={`Remove ${item.name}`}
                              className="text-muted hover:text-error transition-colors p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-line px-6 py-5 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted">Subtotal</span>
                  <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted">Shipping and taxes calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 h-13 px-8 text-base font-medium tracking-wide rounded-xs bg-clay text-white hover:bg-clay-dark transition-all duration-200"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={closeCart}
                  className="text-xs text-muted hover:text-ink text-center transition-colors"
                >
                  or{' '}
                  <Link href="/shop" className="underline underline-offset-2" onClick={closeCart}>
                    continue shopping
                  </Link>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
