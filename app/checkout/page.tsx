'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Shield, Lock } from 'lucide-react'
import { useCart } from '@/store/cart'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { ProgressSteps } from '@/components/checkout/ProgressSteps'
import { Input } from '@/components/ui/Input'
import type { CheckoutStep } from '@/types'

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('contact')
  const { _hydrated } = useCart()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    shippingOption: 'standard',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { items, clearCart } = useCart()

  const update = (field: string, value: string) => {
    setFormData((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (step === 'contact') {
      if (!formData.email) e.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email'
    }
    if (step === 'shipping') {
      if (!formData.firstName) e.firstName = 'First name is required'
      if (!formData.lastName) e.lastName = 'Last name is required'
      if (!formData.address) e.address = 'Address is required'
      if (!formData.city) e.city = 'City is required'
      if (!formData.zip) e.zip = 'ZIP code is required'
    }
    if (step === 'payment') {
      if (!formData.cardNumber) e.cardNumber = 'Card number is required'
      if (!formData.cardExpiry) e.cardExpiry = 'Expiry date is required'
      if (!formData.cardCvc) e.cardCvc = 'CVC is required'
      if (!formData.cardName) e.cardName = 'Name on card is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (!validate()) return
    const order: Record<CheckoutStep, CheckoutStep> = {
      contact: 'shipping',
      shipping: 'payment',
      payment: 'review',
      review: 'confirmation',
      confirmation: 'confirmation',
    }
    setStep(order[step])
  }

  const handlePlaceOrder = () => {
    const orderId = `VSL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    clearCart()
    router.push(`/checkout/confirmation?order=${orderId}`)
  }

  if (!_hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-line border-t-clay rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="font-display text-3xl font-light text-ink">Your bag is empty.</p>
        <Link href="/shop" className="text-sm text-clay underline underline-offset-2">
          Go back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Minimal checkout header */}
      <header className="border-b border-line">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
            VESSEL
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Lock className="w-3 h-3" />
            Secure checkout
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
          {/* Left: form */}
          <div>
            {/* Progress */}
            <div className="mb-8">
              <ProgressSteps current={step} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* ── CONTACT ── */}
                {step === 'contact' && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-1">
                        Contact
                      </h2>
                      <p className="text-sm text-muted">
                        Already have an account?{' '}
                        <Link href="/account" className="text-clay underline underline-offset-2">
                          Log in
                        </Link>
                      </p>
                    </div>
                    <Input
                      label="Email address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => update('email', e.target.value)}
                      error={errors.email}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    <label className="flex items-center gap-3 text-sm text-ink cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-clay w-3.5 h-3.5" />
                      Send me updates about my order and new arrivals
                    </label>
                  </div>
                )}

                {/* ── SHIPPING ── */}
                {step === 'shipping' && (
                  <div className="flex flex-col gap-5">
                    <h2 className="font-display text-3xl font-light tracking-tight text-ink">
                      Shipping
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First name"
                        value={formData.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        error={errors.firstName}
                        autoComplete="given-name"
                      />
                      <Input
                        label="Last name"
                        value={formData.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        error={errors.lastName}
                        autoComplete="family-name"
                      />
                    </div>
                    <Input
                      label="Address"
                      value={formData.address}
                      onChange={(e) => update('address', e.target.value)}
                      error={errors.address}
                      autoComplete="street-address"
                    />
                    <div className="grid grid-cols-[1fr_120px_120px] gap-4">
                      <Input
                        label="City"
                        value={formData.city}
                        onChange={(e) => update('city', e.target.value)}
                        error={errors.city}
                        autoComplete="address-level2"
                      />
                      <Input
                        label="State"
                        value={formData.state}
                        onChange={(e) => update('state', e.target.value)}
                        autoComplete="address-level1"
                      />
                      <Input
                        label="ZIP"
                        value={formData.zip}
                        onChange={(e) => update('zip', e.target.value)}
                        error={errors.zip}
                        autoComplete="postal-code"
                      />
                    </div>
                    <Input
                      label="Phone (optional)"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      autoComplete="tel"
                    />

                    {/* Shipping method */}
                    <div className="flex flex-col gap-2 mt-2">
                      <p className="text-xs uppercase tracking-widest text-muted font-medium">
                        Shipping method
                      </p>
                      {[
                        { id: 'standard', label: 'Standard', desc: '5–7 business days', price: 'Free over $95' },
                        { id: 'express', label: 'Express', desc: '2–3 business days', price: '$18' },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center justify-between p-4 border border-line rounded-xs cursor-pointer hover:border-clay transition-colors has-[:checked]:border-clay has-[:checked]:bg-surface"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={opt.id}
                              checked={formData.shippingOption === opt.id}
                              onChange={() => update('shippingOption', opt.id)}
                              className="accent-clay"
                            />
                            <div>
                              <p className="text-sm font-medium text-ink">{opt.label}</p>
                              <p className="text-xs text-muted">{opt.desc}</p>
                            </div>
                          </div>
                          <span className="text-sm text-ink font-medium">{opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── PAYMENT ── */}
                {step === 'payment' && (
                  <div className="flex flex-col gap-5">
                    <h2 className="font-display text-3xl font-light tracking-tight text-ink">
                      Payment
                    </h2>

                    {/* Express options */}
                    <div className="grid grid-cols-2 gap-3">
                      {['Apple Pay', 'Google Pay'].map((method) => (
                        <button
                          key={method}
                          className="h-11 border border-line rounded-xs text-sm font-medium text-ink hover:border-clay hover:bg-surface transition-all duration-150"
                        >
                          {method}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-line" />
                      <span className="text-xs text-muted">or pay by card</span>
                      <div className="flex-1 h-px bg-line" />
                    </div>

                    <Input
                      label="Card number"
                      value={formData.cardNumber}
                      onChange={(e) => update('cardNumber', e.target.value)}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      autoComplete="cc-number"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry date"
                        value={formData.cardExpiry}
                        onChange={(e) => update('cardExpiry', e.target.value)}
                        error={errors.cardExpiry}
                        placeholder="MM / YY"
                        autoComplete="cc-exp"
                      />
                      <Input
                        label="CVC"
                        value={formData.cardCvc}
                        onChange={(e) => update('cardCvc', e.target.value)}
                        error={errors.cardCvc}
                        placeholder="123"
                        autoComplete="cc-csc"
                      />
                    </div>
                    <Input
                      label="Name on card"
                      value={formData.cardName}
                      onChange={(e) => update('cardName', e.target.value)}
                      error={errors.cardName}
                      autoComplete="cc-name"
                    />

                    <div className="flex items-center gap-2 text-xs text-muted pt-1">
                      <Shield className="w-3.5 h-3.5 text-clay" />
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                )}

                {/* ── REVIEW ── */}
                {step === 'review' && (
                  <div className="flex flex-col gap-6">
                    <h2 className="font-display text-3xl font-light tracking-tight text-ink">
                      Review order
                    </h2>

                    {/* Summary rows */}
                    {[
                      { label: 'Contact', value: formData.email },
                      {
                        label: 'Ship to',
                        value: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
                      },
                      { label: 'Shipping', value: formData.shippingOption === 'express' ? 'Express — $18' : 'Standard — Free over $95' },
                      { label: 'Payment', value: `Card ending ****${formData.cardNumber.slice(-4) || '****'}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-6 py-3 border-b border-line last:border-b-0">
                        <span className="text-xs uppercase tracking-widest text-muted w-20 shrink-0 pt-0.5">
                          {label}
                        </span>
                        <span className="text-sm text-ink flex-1">{value || '—'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-line">
              {step !== 'contact' ? (
                <button
                  onClick={() => {
                    const prev: Record<CheckoutStep, CheckoutStep> = {
                      shipping: 'contact',
                      payment: 'shipping',
                      review: 'payment',
                      contact: 'contact',
                      confirmation: 'confirmation',
                    }
                    setStep(prev[step])
                  }}
                  className="text-sm text-muted hover:text-ink transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step === 'review' ? (
                <button
                  onClick={handlePlaceOrder}
                  className="h-12 px-8 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
                >
                  Place order
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="h-12 px-8 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          {/* Right: order summary (desktop) */}
          <div className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
