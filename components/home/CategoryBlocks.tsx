'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    slug: 'drinking',
    label: 'Drinking',
    description: 'Mugs, tumblers, espresso cups',
    image: 'https://images.unsplash.com/photo-1610206349499-c932c3b3aacb?w=700&h=900&fit=crop&auto=format&q=80',
    count: 3,
  },
  {
    slug: 'dining',
    label: 'Dining',
    description: 'Plates, bowls, serving pieces',
    image: 'https://images.unsplash.com/photo-1714836986273-9a62b37f55fa?w=700&h=900&fit=crop&auto=format&q=80',
    count: 7,
  },
  {
    slug: 'living',
    label: 'Living',
    description: 'Vases, planters, decorative objects',
    image: 'https://images.unsplash.com/photo-1610128361323-6e941c97f023?w=700&h=900&fit=crop&auto=format&q=80',
    count: 5,
  },
]

export function CategoryBlocks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">
              Shop by category
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink">
              Find your object.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group block relative overflow-hidden rounded-sm bg-canvas"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={`${cat.label} ceramics by VESSEL`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors duration-300" />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-canvas/92 backdrop-blur-sm px-5 py-4 rounded-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-2xl font-medium text-ink tracking-tight">{cat.label}</p>
                        <p className="text-xs text-muted mt-0.5">{cat.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-clay">
                        <span className="text-xs font-medium">{cat.count} pieces</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
