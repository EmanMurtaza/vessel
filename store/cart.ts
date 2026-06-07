'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartState } from '@/types'
import { generateCartItemId } from '@/lib/utils'

interface CartStore extends CartState {
  subtotal: number
  itemCount: number
  _hydrated: boolean
  setHydrated: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      _hydrated: false,
      setHydrated: () => set({ _hydrated: true }),

      get subtotal() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
      get itemCount() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      addItem: (item) => {
        const cartItemId = generateCartItemId(item.productId, item.variant)
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { ...item, cartItemId }],
            isOpen: true,
          }
        })
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }))
      },

      updateQuantity: (cartItemId, qty) => {
        if (qty < 1) {
          get().removeItem(cartItemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: qty } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'vessel-cart',
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)

export function useCart() {
  const store = useCartStore()
  const subtotal = store.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = store.items.reduce((sum, item) => sum + item.quantity, 0)
  return { ...store, subtotal, itemCount }
}
