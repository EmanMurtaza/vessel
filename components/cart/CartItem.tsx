'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/lib/utils'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { useCart } from '@/store/cart'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <li className="flex gap-5 py-6 border-b border-line last:border-b-0">
      <div className="relative w-24 h-28 shrink-0 rounded-xs overflow-hidden bg-surface">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${item.slug}`}
              className="text-sm font-medium text-ink hover:text-clay transition-colors truncate block"
            >
              {item.name}
            </Link>
            <p className="text-xs text-muted mt-0.5">{item.variant}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-sm font-medium text-ink">
              {formatPrice(item.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <p className="text-xs text-muted mt-0.5">{formatPrice(item.price)} each</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <QuantityStepper
            value={item.quantity}
            onChange={(q) => updateQuantity(item.cartItemId, q)}
            size="sm"
          />
          <button
            onClick={() => removeItem(item.cartItemId)}
            aria-label={`Remove ${item.name} from bag`}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-error transition-colors duration-150"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
