'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, User, MapPin, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export function AccountView() {
  const [tab, setTab] = useState<'orders' | 'details' | 'addresses'>('orders')
  const isLoggedIn = false

  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto px-6 py-20">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">Account</p>
          <h1 className="font-display text-4xl font-light tracking-tight text-ink">Log in.</h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" autoComplete="email" />
          <Input label="Password" type="password" autoComplete="current-password" />
          <button
            type="submit"
            className="h-12 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
          >
            Log in
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-2 text-center">
          <a
            href="#"
            className="text-sm text-clay underline underline-offset-2 hover:text-clay-dark transition-colors"
          >
            Forgot your password?
          </a>
          <p className="text-sm text-muted">
            New customer?{' '}
            <Link href="/checkout" className="text-clay underline underline-offset-2">
              Create account at checkout
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-20">
      <div className="mb-10">
        <h1 className="font-display text-5xl font-light tracking-tight text-ink">My account.</h1>
      </div>

      <div className="flex gap-6 border-b border-line mb-8">
        {[
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'details', label: 'Details', icon: User },
          { id: 'addresses', label: 'Addresses', icon: MapPin },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id as typeof tab)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-all duration-150 -mb-px ${
              tab === id
                ? 'border-clay text-clay'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="text-center py-16">
          <p className="font-display text-3xl font-light text-muted mb-3">No orders yet.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-clay font-medium"
          >
            Start shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
