import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About VESSEL',
  description:
    'The story behind VESSEL — handcrafted ceramic objects made in small batches from stoneware clay.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-surface overflow-hidden min-h-[55svh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/vessel-about-hero/1400/700"
            alt="The VESSEL studio"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/40" />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 pb-14 md:pb-20">
          <p className="text-xs uppercase tracking-widest text-canvas/60 mb-4 font-medium">
            Our story
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight text-canvas leading-tight max-w-2xl">
            Made slowly,
            <br />
            by intention.
          </h1>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        {/* Grid: text + portrait */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 md:gap-20 mb-20">
          <div className="max-w-prose">
            <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-6">
              Why we started
            </h2>
            <div className="flex flex-col gap-5 text-base text-muted leading-relaxed">
              <p>
                We started VESSEL in 2019 in a converted warehouse space in the industrial outskirts of
                Portland with two kick wheels, one secondhand kiln, and a conviction that the objects
                you reach for every morning should be made with the same care you bring to other
                considered purchases.
              </p>
              <p>
                The ceramics industry is full of beautiful things that aren&rsquo;t particularly useful,
                and useful things that aren&rsquo;t particularly beautiful. We wanted to make objects that
                were both — that earned their place on the counter by being better to use, not just
                better to look at.
              </p>
              <p>
                Five years later, we still throw every piece by hand on a wheel. We still fire in small
                batches. We still hold every finished piece and ask: is this one we&rsquo;d keep?
              </p>
            </div>
          </div>

          <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-surface">
            <Image
              src="https://picsum.photos/seed/vessel-founder/600/800"
              alt="VESSEL founder at the pottery wheel"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 380px"
            />
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-line pt-16 mb-16">
          <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-10">
            What we believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Variation is craft',
                body: 'No two pieces are identical. The slight asymmetry in a bowl, the variation in glaze color across a batch — these are the marks of a hand at work, not quality defects.',
              },
              {
                title: 'Function is design',
                body: 'We start every piece with a question: how will this be used? The handle angle, the lip profile, the weight of the base — everything has a reason.',
              },
              {
                title: 'Objects should last',
                body: 'We use kiln-fired stoneware clay that gets stronger with use and heat. We design pieces that go in the dishwasher and survive the daily demands of a working kitchen.',
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="font-display text-xl font-medium text-ink mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process images */}
        <div className="border-t border-line pt-16 mb-16">
          <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-10">
            The process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { seed: 'vessel-process-1', caption: 'Throwing on the wheel' },
              { seed: 'vessel-process-2', caption: 'Hand-trimming the foot ring' },
              { seed: 'vessel-process-3', caption: 'Loading the kiln' },
              { seed: 'vessel-process-4', caption: 'Quality check after firing' },
            ].map(({ seed, caption }) => (
              <div key={seed} className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-surface">
                  <Image
                    src={`https://picsum.photos/seed/${seed}/800/600`}
                    alt={caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-xs text-muted">{caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-line pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-light tracking-tight text-ink mb-2">
              Ready to find your piece?
            </h2>
            <p className="text-base text-muted">Start with a mug. Stay for the rest of the table.</p>
          </div>
          <Link
            href="/shop"
            className="shrink-0 inline-flex items-center gap-2 h-12 px-7 bg-clay text-white text-sm font-medium rounded-xs hover:bg-clay-dark transition-all duration-200"
          >
            Shop the collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
