'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const navLinks = [
  { href: '/shop', label: 'All Objects' },
  { href: '/shop?category=drinking', label: 'Drinking' },
  { href: '/shop?category=dining', label: 'Dining' },
  { href: '/shop?category=living', label: 'Living' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-canvas flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-line">
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-xl tracking-tight font-semibold text-ink"
              >
                VESSEL
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 -mr-2 text-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-6 py-8 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.22 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 text-2xl font-display font-light tracking-tight text-ink hover:text-clay transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pb-8 border-t border-line pt-6">
              <div className="flex flex-col gap-3 text-sm text-muted">
                <Link href="/faq" onClick={onClose} className="hover:text-ink transition-colors">FAQ</Link>
                <Link href="/shipping-returns" onClick={onClose} className="hover:text-ink transition-colors">Shipping &amp; Returns</Link>
                <Link href="/account" onClick={onClose} className="hover:text-ink transition-colors">My Account</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
