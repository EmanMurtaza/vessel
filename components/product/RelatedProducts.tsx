import type { Product } from '@/types'
import { ProductCard } from '@/components/shop/ProductCard'

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-16 border-t border-line">
      <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-8">
        You may also like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
