import Link from 'next/link'

const shopLinks = [
  { href: '/shop', label: 'All Objects' },
  { href: '/shop?category=drinking', label: 'Drinking' },
  { href: '/shop?category=dining', label: 'Dining' },
  { href: '/shop?category=living', label: 'Living' },
  { href: '/shop?tag=new', label: 'New Arrivals' },
  { href: '/shop?tag=giftable', label: 'Gifts' },
]

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const supportLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/shipping-returns', label: 'Shipping & Returns' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-canvas mt-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-canvas block mb-3">
              VESSEL
            </Link>
            <p className="text-sm text-canvas/50 leading-relaxed max-w-[200px]">
              Handcrafted ceramic objects for the considered home. Made in small batches.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="text-canvas/40 hover:text-canvas transition-colors duration-150"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="text-canvas/40 hover:text-canvas transition-colors duration-150"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641 0 12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-canvas/40 mb-5">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/70 hover:text-canvas transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-canvas/40 mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/70 hover:text-canvas transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-canvas/40 mb-5">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/70 hover:text-canvas transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-canvas/30">
            © {new Date().getFullYear()} VESSEL. All rights reserved.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
            {['Visa', 'MC', 'Amex', 'PayPal', 'ApplePay'].map((method) => (
              <span
                key={method}
                className="px-2 py-1 text-[9px] font-bold tracking-wide border border-white/15 rounded-xs text-canvas/30"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
