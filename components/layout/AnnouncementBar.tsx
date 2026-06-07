'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 36, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="bg-ink text-canvas text-xs tracking-wide flex items-center justify-center h-9 px-4 relative">
            <p>
              Free shipping on orders over $95 —{' '}
              <Link href="/shop" className="underline underline-offset-2 hover:text-clay-light transition-colors">
                Shop now
              </Link>
            </p>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-canvas/60 hover:text-canvas transition-colors p-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
