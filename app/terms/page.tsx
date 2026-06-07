import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'VESSEL terms of service.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-muted mb-3 font-medium">Legal</p>
        <h1 className="font-display text-5xl font-light tracking-tight text-ink">Terms of Service.</h1>
        <p className="text-sm text-muted mt-3">Last updated: January 2025</p>
      </div>

      <div className="flex flex-col gap-8 text-sm text-muted leading-relaxed">
        {[
          {
            title: '1. Use of the site',
            body: 'By accessing vessel.co, you agree to these terms. The site is intended for personal, non-commercial use. You may not use the site to infringe on intellectual property rights or engage in fraudulent transactions.',
          },
          {
            title: '2. Orders and payment',
            body: 'By placing an order, you represent that you are authorized to use the payment method provided. We reserve the right to cancel orders at our discretion, including for suspected fraud or pricing errors. Accepted payments include major credit/debit cards and express checkout options.',
          },
          {
            title: '3. Product descriptions',
            body: 'We make every effort to display product colors and dimensions accurately. Because all pieces are handmade, slight variations exist between batches and product photography. These variations are inherent to the medium and are not considered defects.',
          },
          {
            title: '4. Intellectual property',
            body: 'All content on this site — text, photography, design, and brand marks — is the property of VESSEL and may not be reproduced without written permission.',
          },
          {
            title: '5. Limitation of liability',
            body: 'VESSEL is not liable for indirect, incidental, or consequential damages arising from the use of our products or site. Our total liability for any claim shall not exceed the amount paid for the relevant order.',
          },
          {
            title: '6. Governing law',
            body: 'These terms are governed by the laws of the State of Oregon, USA. Any disputes shall be resolved in the courts of Multnomah County, Oregon.',
          },
          {
            title: '7. Contact',
            body: 'For questions about these terms, email hello@vessel.co.',
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
