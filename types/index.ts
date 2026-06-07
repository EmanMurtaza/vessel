export type Category = 'drinking' | 'dining' | 'living'

export interface ProductVariant {
  type: 'color' | 'size'
  value: string
  available: boolean
  priceModifier?: number
}

export interface ProductReview {
  id: string
  author: string
  location: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  category: Category
  tags: string[]
  variants: ProductVariant[]
  images: string[]
  stock: number
  isBestseller: boolean
  isNew: boolean
  isSoldOut?: boolean
  materials: string
  dimensions: string
  careInstructions: string
  reviews: ProductReview[]
  relatedProductIds: string[]
}

export interface CartItem {
  cartItemId: string
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  variant: string
  image: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export type CheckoutStep = 'contact' | 'shipping' | 'payment' | 'review' | 'confirmation'

export interface ShippingOption {
  id: string
  label: string
  description: string
  price: number
  eta: string
}

export interface FilterState {
  category: Category | 'all'
  priceRange: [number, number]
  sort: 'featured' | 'price-asc' | 'price-desc' | 'newest'
  inStockOnly: boolean
}
