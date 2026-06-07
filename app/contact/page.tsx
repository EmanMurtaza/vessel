import type { Metadata } from 'next'
import { Mail, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with VESSEL — we reply within one business day.',
}

export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-20">
      <div className="mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">Get in touch</p>
        <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-ink">
          Contact.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-20">
        <ContactForm />

        <div className="flex flex-col gap-8">
          {[
            {
              icon: Mail,
              title: 'Email',
              lines: ['hello@vessel.co', 'We reply within 1 business day'],
            },
            {
              icon: MapPin,
              title: 'Studio & Showroom',
              lines: ['1248 NW Industrial St', 'Portland, OR 97209', 'Visits by appointment'],
            },
            {
              icon: Clock,
              title: 'Studio hours',
              lines: ['Mon–Fri: 9am–5pm PST', 'Closed weekends and US public holidays'],
            },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex gap-4">
              <div className="w-9 h-9 rounded-xs bg-surface flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-clay" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink mb-1">{title}</p>
                {lines.map((l) => (
                  <p key={l} className="text-sm text-muted">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
