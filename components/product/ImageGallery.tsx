'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveIdx((i) => (i + 1) % images.length)

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col gap-2 md:w-[72px]">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            className={cn(
              'relative shrink-0 overflow-hidden rounded-xs transition-all duration-150',
              'w-16 h-16 md:w-full md:h-[72px]',
              activeIdx === i
                ? 'ring-1.5 ring-clay ring-offset-1'
                : 'opacity-60 hover:opacity-100'
            )}
          >
            <Image
              src={src}
              alt={`${productName} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="72px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-surface cursor-zoom-in group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIdx]}
                alt={`${productName} — view ${activeIdx + 1}`}
                fill
                priority={activeIdx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-canvas/80 backdrop-blur-sm px-2 py-1 rounded-xs flex items-center gap-1 text-xs text-muted">
              <ZoomIn className="w-3 h-3" />
              Zoom
            </div>
          </div>

          {/* Arrow navigation (mobile) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden w-8 h-8 rounded-full bg-canvas/80 backdrop-blur-sm flex items-center justify-center text-ink shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 md:hidden w-8 h-8 rounded-full bg-canvas/80 backdrop-blur-sm flex items-center justify-center text-ink shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators (mobile) */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  'rounded-full transition-all duration-200',
                  i === activeIdx ? 'w-4 h-1.5 bg-clay' : 'w-1.5 h-1.5 bg-line'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
