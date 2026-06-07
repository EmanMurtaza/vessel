'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/store/cart'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

export function OrderSummary() {
  const { items, subtotal } = useCart()
  const [open, setOpen] = useState(false)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8
  const total = subtotal + shipping

  return (
    <div className="bg-surface rounded-sm border border-line">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden w-full flex items-center justify-between px-5 py-4"
      >
        <span className="text-sm font-medium text-ink flex items-center gap-2">
          <ChevronDown
            className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
          Order summary
        </span>
        <span className="font-medium text-ink">{formatPrice(total)}</span>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {(open || true) && (
          <motion.div
            className="hidden lg:block"
          >
            <div className="lg:block px-5 py-5">
              {/* Items */}
              <ul className="flex flex-col gap-4 mb-5">
                {items.map((item) => (
                  <li key={item.cartItemId} className="flex gap-3">
                    <div className="relative w-14 h-16 shrink-0 rounded-xs overflow-hidden bg-canvas border border-line">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-muted text-canvas text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                      <p className="text-xs text-muted mt-0.5">{item.variant}</p>
                    </div>
                    <span className="text-sm font-medium text-ink shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Discount code */}
              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 h-9 px-3 text-xs border border-line rounded-xs bg-canvas focus:outline-none focus:ring-1 focus:ring-clay focus:border-clay placeholder:text-muted"
                />
                <button className="h-9 px-4 text-xs font-medium border border-line rounded-xs text-ink hover:bg-canvas transition-colors">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2.5 border-t border-line pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-ink font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-ink font-medium">
                    {shipping === 0 ? (
                      <span className="text-clay">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-muted">Calculated at next step</span>
                </div>
                <div className="flex justify-between border-t border-line pt-3 mt-1">
                  <span className="font-medium text-ink">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-muted mr-1">USD</span>
                    <span className="font-medium text-ink text-lg">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
