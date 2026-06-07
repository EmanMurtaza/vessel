import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, getProductBySlug, getRelatedProducts } from '@/data/products'
import { ImageGallery } from '@/components/product/ImageGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ProductReviews } from '@/components/product/ProductReviews'
import { RelatedProducts } from '@/components/product/RelatedProducts'

interface PDPProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PDPProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 800, height: 1000, alt: product.name }],
    },
  }
}

export default async function ProductDetailPage({ params }: PDPProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const related = getRelatedProducts(product.id, product.relatedProductIds)

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-[1280px] mx-auto px-6 pt-6 pb-0">
        <ol className="flex items-center gap-2 text-xs text-muted">
          <li>
            <a href="/" className="hover:text-clay transition-colors">Home</a>
          </li>
          <li aria-hidden>/</li>
          <li>
            <a href="/shop" className="hover:text-clay transition-colors">Shop</a>
          </li>
          <li aria-hidden>/</li>
          <li>
            <a
              href={`/shop?category=${product.category}`}
              className="hover:text-clay transition-colors capitalize"
            >
              {product.category}
            </a>
          </li>
          <li aria-hidden>/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      {/* Main PDP layout */}
      <div className="max-w-[1280px] mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Info — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews reviews={product.reviews} productName={product.name} />

        {/* Related */}
        <RelatedProducts products={related} />
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.shortDescription,
            image: product.images,
            brand: { '@type': 'Brand', name: 'VESSEL' },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'USD',
              availability:
                product.isSoldOut || product.stock === 0
                  ? 'https://schema.org/OutOfStock'
                  : 'https://schema.org/InStock',
            },
            aggregateRating:
              product.reviews.length > 0
                ? {
                    '@type': 'AggregateRating',
                    ratingValue: (
                      product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
                    ).toFixed(1),
                    reviewCount: product.reviews.length,
                  }
                : undefined,
          }),
        }}
      />
    </>
  )
}
