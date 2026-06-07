import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'VESSEL — Handcrafted Ceramic Objects',
    template: '%s | VESSEL',
  },
  description:
    'Handcrafted ceramic objects for the considered home. Mugs, bowls, vases, and serving pieces made in small batches from stoneware clay.',
  keywords: ['ceramics', 'handcrafted', 'pottery', 'homeware', 'mugs', 'bowls', 'vases'],
  authors: [{ name: 'VESSEL' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VESSEL',
    title: 'VESSEL — Handcrafted Ceramic Objects',
    description:
      'Handcrafted ceramic objects for the considered home. Made in small batches from stoneware clay.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VESSEL — Handcrafted Ceramic Objects',
    description: 'Handcrafted ceramic objects for the considered home.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-canvas text-ink font-body antialiased">
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
