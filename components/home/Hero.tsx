'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface min-h-[85svh] flex items-stretch">
      <div className="w-full max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] items-center gap-0">

        {/* Text column */}
        <div className="py-16 lg:py-24 pr-0 lg:pr-16 flex flex-col justify-center">
          <motion.p {...fadeUp(0)} className="text-xs uppercase tracking-widest text-muted mb-6 font-medium">
            Stoneware · Made by hand · Small batches
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-5xl md:text-6xl xl:text-7xl font-light tracking-tight text-ink leading-[1.05] mb-6"
          >
            Objects that
            <br />
            <em className="not-italic text-clay">earn their place.</em>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-base text-muted leading-relaxed max-w-[42ch] mb-10">
            Handcrafted ceramic homeware — mugs, bowls, vases, serving pieces —
            made to be used every day and kept for years.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex items-center gap-4 flex-wrap">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-7 bg-clay text-white text-sm font-medium tracking-wide rounded-xs hover:bg-clay-dark transition-all duration-200"
            >
              Shop the collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 h-12 px-5 text-sm font-medium text-ink-2 hover:text-clay transition-colors duration-200"
            >
              Our story
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="flex items-center gap-6 mt-14 pt-8 border-t border-line"
          >
            {[
              { value: '4,200+', label: 'Happy customers' },
              { value: '12', label: 'Glaze varieties' },
              { value: '5yr', label: 'In the studio' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-2xl font-medium text-ink tracking-tight">{value}</span>
                <span className="text-xs text-muted mt-0.5">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative h-[55svh] lg:h-[85svh] -mx-6 lg:mx-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?w=900&h=1100&fit=crop&auto=format&q=80"
            alt="A collection of VESSEL stoneware ceramics — mugs, bowls, and vases in warm bone white"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-clay/5 mix-blend-multiply pointer-events-none" />

          <div className="absolute bottom-8 left-6 bg-canvas/95 backdrop-blur-sm px-4 py-3 rounded-sm shadow-md flex items-center gap-3">
            <div className="w-1 h-8 bg-clay rounded-full" />
            <div>
              <p className="text-xs text-muted">Featured</p>
              <p className="text-sm font-medium text-ink">Morning Mug — Bone White</p>
            </div>
            <Link
              href="/product/morning-mug"
              className="ml-2 text-xs font-medium text-clay hover:underline underline-offset-2"
            >
              $65
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
