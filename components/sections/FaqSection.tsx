// Server Component — no 'use client'
import { getFaqs } from '@/lib/db/queries'
import { FaqAccordion } from '@/components/FaqAccordion'
import type { Faq } from '@/lib/db/schema'

// ---------------------------------------------------------------------------
// Fallback data — rendered when DB is unreachable (local dev without Supabase).
// Content matches scripts/seed-faqs.ts exactly.
// ---------------------------------------------------------------------------
const FALLBACK_FAQS: Faq[] = [
  {
    id: 1,
    question: 'What services does Retinalinks offer?',
    answer:
      'We design and build websites, mobile apps, web applications, and brand identities for companies of all sizes, worldwide.',
    order: 1,
  },
  {
    id: 2,
    question: 'Do you work with clients outside India?',
    answer:
      'Yes — Retinalinks works with clients globally, across time zones, with async-friendly communication.',
    order: 2,
  },
  {
    id: 3,
    question: 'How long does a typical project take?',
    answer:
      'Most projects launch within 4-8 weeks depending on scope, from first call to live product.',
    order: 3,
  },
  {
    id: 4,
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes, every project includes a post-launch support window, with maintenance plans available beyond that.',
    order: 4,
  },
  {
    id: 5,
    question: "What's your development process?",
    answer:
      'Discovery → Design → Development → Testing → Launch — with regular check-ins at every stage so there are no surprises.',
    order: 5,
  },
  {
    id: 6,
    question: 'How do I get started?',
    answer:
      "Reach out through our contact form — we'll respond within 48 hours with next steps and a proposal.",
    order: 6,
  },
]

// ---------------------------------------------------------------------------
// FaqSection — server component
// ---------------------------------------------------------------------------
export async function FaqSection() {
  let faqs: Faq[]
  try {
    faqs = await getFaqs()
    if (faqs.length === 0) faqs = FALLBACK_FAQS
  } catch {
    faqs = FALLBACK_FAQS
  }

  // Build FAQPage JSON-LD from the same live fetched data — no duplication.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      {/*
       * FAQPage JSON-LD structured data — injected inline per the Next.js guide
       * (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
       * '<' is replaced with '\u003c' to prevent XSS injection via JSON.stringify.
       */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="faq-inner">
        <header className="faq-header">
          <h2 id="faq-heading" className="faq-heading">
            Frequently Asked Questions
          </h2>
        </header>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  )
}
