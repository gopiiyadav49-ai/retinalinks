// Server Component — no 'use client'
import Link from 'next/link'

export function ClosingCtaSection() {
  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <div className="cta-inner">
        {/* Heading */}
        <h2 id="cta-heading" className="cta-heading">
          Ready to Build Something Premium?
        </h2>

        {/* Subtext */}
        <p className="cta-subtext">
          Let&apos;s talk about your project — no obligation, just a conversation.
        </p>

        {/* Single primary CTA */}
        <Link href="/contact" className="cta-btn-primary" id="cta-start-project">
          Start Your Project
        </Link>
      </div>
    </section>
  )
}
