import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'VESSEL privacy policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">Legal</p>
        <h1 className="font-display text-5xl font-light tracking-tight text-ink">Privacy Policy.</h1>
        <p className="text-sm text-muted mt-3">Last updated: January 2025</p>
      </div>

      <div className="flex flex-col gap-8 text-sm text-muted leading-relaxed">
        {[
          {
            title: 'Information we collect',
            body: 'When you place an order, we collect your name, email address, shipping address, and payment information. Payment data is processed by Stripe and never stored on our servers. We also collect browsing data through standard cookies to improve the shopping experience.',
          },
          {
            title: 'How we use your information',
            body: 'We use your information to process orders, send order confirmations and shipping updates, and (if you opt in) send occasional emails about new products and promotions. We do not sell your personal information to third parties.',
          },
          {
            title: 'Cookies',
            body: 'We use essential cookies to keep your cart working across sessions, and optional analytics cookies to understand how visitors use our site. You can disable non-essential cookies in your browser settings at any time.',
          },
          {
            title: 'Data retention',
            body: 'We retain order data for 7 years for accounting purposes. You may request deletion of your personal data at any time by emailing hello@vessel.co — we will delete all data except what is required for legal compliance.',
          },
          {
            title: 'Your rights',
            body: 'Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@vessel.co.',
          },
          {
            title: 'Contact',
            body: 'For any privacy-related questions, email hello@vessel.co or write to VESSEL, 1248 NW Industrial St, Portland, OR 97209.',
          },
        ].map(({ title, body }) => (
          <section key={title}>
            <h2 className="font-display text-xl font-medium text-ink tracking-tight mb-3">{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
