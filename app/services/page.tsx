import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react'
import BlobAccent from '@/components/BlobAccent'
import ClayCard from '@/components/ClayCard'
import ServicesDetailedList from '@/components/services/ServicesDetailedList'
import ServicesProcess from '@/components/services/ServicesProcess'
import ServicesFaq from '@/components/services/ServicesFaq'

export const metadata: Metadata = {
  title: 'Services — Digital Agency Capabilities | Retinalinks',
  description:
    'Full-cycle web design, mobile app development, custom web applications, and branding systems engineered for ambitious digital products.',
}

export default function ServicesPage() {
  return (
    <>
      {/* ═══════════════════════════════════════
          SERVICES HERO
      ═══════════════════════════════════════ */}
      <section
        style={{
          paddingTop: '9rem',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating atmospheric blob accents */}
        <BlobAccent
          color1="#F5C6A5"
          color2="#F0B8C4"
          size={520}
          top="-80px"
          right="-100px"
          opacity={0.4}
          blur={60}
          animationDuration={7}
          parallaxStrength={0.02}
        />
        <BlobAccent
          color1="#A9DCD9"
          color2="#C3BFF0"
          size={420}
          bottom="-60px"
          left="-100px"
          opacity={0.35}
          blur={55}
          animationDuration={8}
          animationDelay={1.2}
          parallaxStrength={0.025}
        />

        <div className="section-inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(245,198,165,0.28)',
              borderRadius: '100px',
              padding: '7px 18px',
              marginBottom: '1.75rem',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 14px rgba(200,140,90,0.18), 0 1px 3px rgba(200,140,90,0.12)',
              border: '1px solid rgba(255,255,255,0.5)',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5C6A5, #F0B8C4)',
                display: 'inline-block',
                boxShadow: '0 1px 3px rgba(200,120,80,0.3)',
                flexShrink: 0,
              }}
            />
            <span className="eyebrow" style={{ color: '#6B4F3A' }}>
              Full-Cycle Digital Build
            </span>
          </div>

          {/* Heading */}
          <h1
            className="display-heading"
            style={{
              maxWidth: 820,
              margin: '0 auto 1.5rem',
              lineHeight: 1.12,
            }}
          >
            Services engineered to turn vision into market leaders.
          </h1>

          {/* Subtext */}
          <p
            className="body-lead"
            style={{
              maxWidth: 620,
              margin: '0 auto 2.5rem',
              color: 'var(--color-text-mid)',
            }}
          >
            We partner with visionary founders and scaling companies to design and engineer web
            apps, mobile platforms, and brand systems built for long-term growth.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="btn-primary active:scale-[0.97]"
              id="services-hero-cta-primary"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
            <a
              href="#capabilities-list"
              className="btn-secondary active:scale-[0.97]"
              id="services-hero-cta-secondary"
            >
              Explore Capabilities
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CORE SERVICES DEEP-DIVE
      ═══════════════════════════════════════ */}
      <section
        id="capabilities-list"
        className="section"
        style={{
          paddingTop: '3rem',
          paddingBottom: '6rem',
          scrollMarginTop: '80px',
        }}
      >
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              What We Excel At
            </p>
            <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>
              Specialized expertise, holistic execution.
            </h2>
            <p className="body-lead" style={{ maxWidth: 540, margin: '0 auto' }}>
              Filter through our primary core service tracks or explore the full spectrum of our
              capabilities.
            </p>
          </div>

          {/* Interactive Detailed Services Component */}
          <ServicesDetailedList />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROCESS / METHODOLOGY
      ═══════════════════════════════════════ */}
      <section
        className="section"
        style={{
          paddingTop: '5rem',
          paddingBottom: '6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background blob */}
        <BlobAccent
          color1="#F5DDA0"
          color2="#F5C6A5"
          size={360}
          top="10%"
          left="-80px"
          opacity={0.3}
          blur={50}
        />

        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              Our Methodology
            </p>
            <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>
              A 4-step framework for predictable delivery.
            </h2>
            <p className="body-lead" style={{ maxWidth: 520, margin: '0 auto' }}>
              No surprises, no opaque handoffs. Transparent progress at every milestone.
            </p>
          </div>

          <ServicesProcess />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ / CAPABILITIES QUESTIONS
      ═══════════════════════════════════════ */}
      <section
        className="section"
        style={{
          paddingTop: '4rem',
          paddingBottom: '6rem',
        }}
      >
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              Got Questions?
            </p>
            <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>
              Frequently Asked Questions
            </h2>
            <p className="body-lead" style={{ maxWidth: 480, margin: '0 auto' }}>
              Everything you need to know about working with Retinalinks.
            </p>
          </div>

          <ServicesFaq />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '7rem' }}>
        <div className="section-inner">
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <BlobAccent
              color1="#F5C6A5"
              color2="#C3BFF0"
              size={340}
              top="-60px"
              right="-60px"
              opacity={0.4}
              blur={45}
            />
            <ClayCard
              radius="xl"
              style={{
                padding: 'clamp(3.5rem, 7vw, 5.5rem)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Assurance pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '100px',
                    padding: '5px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-dark)',
                    marginBottom: '1.25rem',
                    boxShadow: '0 2px 8px rgba(200,160,130,0.15)',
                  }}
                >
                  <Clock size={13} style={{ color: '#F5C6A5' }} />
                  Guaranteed response within 24 hours
                </div>

                <h2
                  className="section-heading"
                  style={{ maxWidth: 580, margin: '0 auto 1rem' }}
                >
                  Ready to start building your next digital product?
                </h2>
                <p
                  className="body-lead"
                  style={{ maxWidth: 480, margin: '0 auto 2.5rem' }}
                >
                  Let&apos;s evaluate your project requirements, scope a realistic roadmap, and bring
                  your product to life.
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Link
                    href="/contact"
                    className="btn-primary active:scale-[0.97]"
                    id="services-bottom-cta"
                  >
                    Schedule a Consultation <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/work"
                    className="btn-secondary active:scale-[0.97]"
                  >
                    Explore Past Case Studies
                  </Link>
                </div>
              </div>
            </ClayCard>
          </div>
        </div>
      </section>
    </>
  )
}
