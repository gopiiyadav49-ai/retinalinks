import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { createMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactSidebar } from '@/components/contact/ContactSidebar'
import { WhatHappensNext } from '@/components/contact/WhatHappensNext'

export const metadata: Metadata = createMetadata({
  title: 'Contact — Retinalinks Digital Agency',
  description:
    'Start your project with Retinalinks. Build premium digital products, web apps, and mobile applications with world-class engineering.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="contact-page-root">
      {/* ── Contact Hero Header ───────────────────────────────────── */}
      <header className="contact-hero-header">
        <Container>
          <div className="contact-hero-inner">
            {/* Availability Pill */}
            <div className="contact-status-pill">
              <span className="contact-status-dot" aria-hidden="true" />
              <span className="contact-status-text">
                Currently accepting projects for Q3 / Q4 — 2 slots available
              </span>
            </div>

            {/* Headline */}
            <h1 className="contact-hero-title">
              Let&apos;s build something <span className="text-gradient">remarkable</span> together.
            </h1>

            {/* Subtext */}
            <p className="contact-hero-subtext">
              Have an ambitious product idea or need an elite engineering team to bring your digital roadmap to life? Fill out our brief builder below, or reach out directly.
            </p>
          </div>
        </Container>
      </header>

      {/* ── Main Contact Interactive Area (2 Columns) ─────────────── */}
      <section className="contact-main-section">
        <Container>
          <div className="contact-layout-grid">
            {/* Left Column: Interactive Project Brief Form */}
            <div className="contact-form-column">
              <ContactForm />
            </div>

            {/* Right Column: Studio Hours, Clocks, Direct Channels */}
            <div className="contact-sidebar-column">
              <ContactSidebar />
            </div>
          </div>
        </Container>
      </section>

      {/* ── What Happens Next Process Strip ───────────────────────── */}
      <Container>
        <WhatHappensNext />
      </Container>
    </div>
  )
}
