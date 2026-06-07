import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { TrustStrip } from '@/components/home/TrustStrip'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { BrandStory } from '@/components/home/BrandStory'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { CategoryBlocks } from '@/components/home/CategoryBlocks'
import { EmailCapture } from '@/components/home/EmailCapture'

export const metadata: Metadata = {
  title: 'VESSEL — Handcrafted Ceramic Objects for the Considered Home',
  description:
    'Handcrafted stoneware ceramics — mugs, bowls, vases, and serving pieces made in small batches. Free shipping on orders over $95.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCollection />
      <BrandStory />
      <ReviewsSection />
      <CategoryBlocks />
      <EmailCapture />
    </>
  )
}
