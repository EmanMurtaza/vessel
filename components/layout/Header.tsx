'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { MobileNav } from './MobileNav'

const shopLinks = [
  { href: '/shop?category=drinking', label: 'Drinking' },
  { href: '/shop?category=dining', label: 'Dining' },
  { href: '/shop?category=living', label: 'Living' },
  { href: '/shop', label: 'All Objects' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const { itemCount, openCart } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setShopOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 bg-canvas transition-shadow duration-300',
          scrolled ? 'shadow-sm border-b border-line' : 'border-b border-transparent'
        )}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-ink shrink-0"
            aria-label="VESSEL — go to homepage"
          >
            VESSEL
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <Link
                href="/shop"
                className={cn(
                  'text-sm text-ink-2 hover:text-clay transition-colors duration-150 py-1',
                  pathname.startsWith('/shop') && 'text-clay'
                )}
              >
                Shop
              </Link>
              <motion.div
                initial={false}
                animate={{ opacity: shopOpen ? 1 : 0, y: shopOpen ? 0 : -6 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-canvas border border-line rounded-sm shadow-md overflow-hidden pointer-events-none',
                  shopOpen && 'pointer-events-auto'
                )}
              >
                <div className="py-2">
                  {shopLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-ink-2 hover:text-clay hover:bg-surface transition-colors duration-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            <Link
              href="/about"
              className={cn(
                'text-sm text-ink-2 hover:text-clay transition-colors duration-150',
                pathname === '/about' && 'text-clay'
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                'text-sm text-ink-2 hover:text-clay transition-colors duration-150',
                pathname === '/contact' && 'text-clay'
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="hidden md:flex w-9 h-9 items-center justify-center text-muted hover:text-ink transition-colors duration-150 rounded-xs"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <Link
              href="/account"
              aria-label="My account"
              className="hidden md:flex w-9 h-9 items-center justify-center text-muted hover:text-ink transition-colors duration-150 rounded-xs"
            >
              <User className="w-4.5 h-4.5" />
            </Link>
            <button
              onClick={openCart}
              aria-label={`Shopping bag — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              className="relative flex w-9 h-9 items-center justify-center text-ink hover:text-clay transition-colors duration-150 rounded-xs"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-clay text-white text-[9px] font-bold px-1 tabular-nums"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex w-9 h-9 items-center justify-center text-ink hover:text-clay transition-colors duration-150 rounded-xs ml-1"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
