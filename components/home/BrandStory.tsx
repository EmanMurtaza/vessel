'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-surface overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-72 lg:h-auto min-h-96"
          >
            <Image
              src="https://images.unsplash.com/photo-1595351298020-038700609878?w=900&h=700&fit=crop&auto=format&q=80"
              alt="The VESSEL studio — a ceramic potter working at a wheel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-clay/8 mix-blend-multiply pointer-events-none" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-20"
          >
            <p className="text-xs uppercase tracking-widest text-muted mb-5 font-medium">
              Our story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ink leading-tight mb-6">
              Made slowly,
              <br />
              by intention.
            </h2>
            <p className="text-base text-muted leading-relaxed mb-4 max-w-prose">
              We started VESSEL in a converted warehouse with two kick wheels, one kiln, and a
              conviction that the objects you reach for every morning should be made with the same
              care you bring to other considered purchases.
            </p>
            <p className="text-base text-muted leading-relaxed mb-8 max-w-prose">
              Every piece is hand-thrown, hand-trimmed, and fired in small batches. Slight
              variations are a feature, not a flaw — they&rsquo;re the evidence of a hand that made a
              choice at the wheel.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-clay-dark transition-colors duration-150"
            >
              Read the full story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
