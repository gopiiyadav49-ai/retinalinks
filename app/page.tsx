import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedHeadline from '@/components/AnimatedHeadline'
import BlobAccent from '@/components/BlobAccent'
import ClayCard from '@/components/ClayCard'
import HeroBubbles from '@/components/HeroBubbles'
import HeroAtmosphere from '@/components/HeroAtmosphere'
import OrbitalRingSystem from '@/components/OrbitalRingSystemLoader'
import ServicesGrid from '@/components/ServicesGrid'
import StatsStrip from '@/components/StatsStrip'
import WorkHoverPreview from '@/components/WorkHoverPreview'
import ScrollTriggerReveals from '@/components/ScrollTriggerReveals'

export const metadata: Metadata = {
  title: 'Retinalinks — Digital Agency | Web Design, App & Web App Development',
  description:
    'Retinalinks partners with ambitious brands to design and build digital products that look great and perform even better.',
}




const projects = [
  {
    title: 'HealthTrack',
    tag:   'Web App',
    desc:  'A patient-facing dashboard that reduced admin overhead by 40% at launch.',
    accent: '#A9DCD9',
  },
  {
    title: 'StudioFlow',
    tag:   'App',
    desc:  'Cross-platform booking app for independent creative studios.',
    accent: '#C3BFF0',
  },
  {
    title: 'Auxano',
    tag:   'Web',
    desc:  'Brand identity + marketing site that doubled conversion within 3 months.',
    accent: '#F5C6A5',
  },
]

export default function HomePage() {
  return (
    <>
      <ScrollTriggerReveals />
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        className="section hero-section"
        style={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(5.5rem, 10vh, 7.5rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── HERO ATMOSPHERE: WebGL fluid color field ── */}
        <HeroAtmosphere />

        {/* ── HERO BUBBLES: soft floating gradient blobs layered above WebGL ── */}
        <HeroBubbles />

        {/* Hero split layout: Text on LEFT, 3D Data Globe & Circles on RIGHT */}
        <div className="section-inner hero-split-grid">
          {/* LEFT COLUMN: Text Area */}
          <div className="hero-text-col" style={{ position: 'relative', zIndex: 60 }}>
            {/* Eyebrow badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245,198,165,0.28)',
                borderRadius: '100px',
                padding: '7px 18px',
                marginBottom: '1.25rem',
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
                Retinalinks — Digital Agency
              </span>
            </div>

            {/* Animated headline left-aligned with 3-line controlled rhythm */}
            <AnimatedHeadline align="left" />

            {/* Subtext — constrained to max 2 lines with tightened vertical rhythm */}
            <p
              className="body-lead"
              style={{
                maxWidth: 475,
                margin: '1.2rem 0 1.35rem',
                color: 'var(--color-text-mid)',
              }}
            >
              Retinalinks partners with ambitious brands to design and build digital products
              that look great and perform even better.
            </p>

            {/* CTAs — evenly spaced with headline-to-subtext gap */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Link
                href="/contact"
                className="btn-primary active:scale-[0.97]"
                id="hero-cta-primary"
                style={{
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
                  boxShadow: '0 8px 24px rgba(61,43,31,0.28), 0 2px 6px rgba(61,43,31,0.14)',
                }}
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <WorkHoverPreview>
                <Link
                  href="/work"
                  className="btn-secondary active:scale-[0.97]"
                  id="hero-cta-secondary"
                  style={{ transition: 'transform 0.15s ease, border-color 0.15s ease, background 0.15s ease' }}
                >
                  See Our Work
                </Link>
              </WorkHoverPreview>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Orbital Ring System (Zoom -> Burst -> Float -> Reform) */}
          <div className="hero-visual-col" style={{ position: 'relative', zIndex: 10 }}>
            <OrbitalRingSystem />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES OVERVIEW
      ═══════════════════════════════════════ */}
      <section
        id="services"
        className="section"
        style={{
          scrollMarginTop: '110px',
          paddingTop:    'clamp(5.5rem, 8vw, 7rem)',
          paddingBottom: '6rem',
          position:      'relative',
          overflow:      'hidden',
        }}
      >
        {/* Corner blob — subtle, behind grid */}
        <BlobAccent
          color1="#F5DDA0"
          color2="#F5C6A5"
          color3="#F0B8C4"
          size={420}
          bottom="-120px"
          right="-140px"
          opacity={0.3}
          blur={55}
          animationDuration={7}
          animationDelay={0.8}
          parallaxStrength={0.015}
        />

        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section header */}
          <div
            id="services-header"
            style={{
              textAlign:    'center',
              marginBottom: '4rem',
            }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>What We Do</p>
            <h2 className="section-heading" style={{ marginBottom: '0.875rem' }}>
              Services built around your growth.
            </h2>
            <p
              className="body-lead"
              style={{ maxWidth: 480, margin: '0 auto', color: 'var(--color-text-mid)' }}
            >
              Everything you need to launch and grow your digital product.
            </p>
          </div>

          {/* Card grid */}
          <ServicesGrid />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS / WHY US
      ═══════════════════════════════════════ */}
      <StatsStrip />

      {/* ═══════════════════════════════════════
          FEATURED WORK
      ═══════════════════════════════════════ */}
      <section
        id="work"
        className="section"
        style={{
          scrollMarginTop: '110px',
          paddingTop: 'clamp(5rem, 8vw, 7rem)',
        }}
      >
        <div className="section-inner">
          <div
            id="work-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Portfolio</p>
              <h2 className="section-heading">Recent Work</h2>
              <p className="body-lead" style={{ marginTop: '0.5rem' }}>
                A few projects we&apos;re proud of.
              </p>
            </div>
            <Link href="/work" className="btn-secondary">
              View all work <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem',
              alignItems: 'stretch',
            }}
          >
            {projects.map(({ title, tag, desc, accent }) => (
              <div key={title} className="work-card-item" style={{ display: 'flex' }}>
                <ClayCard
                  hover
                  style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                  }}
                >
                {/* Color band */}
                <div
                  style={{
                    height: 180,
                    background: `linear-gradient(135deg, ${accent}80, ${accent}30)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: 'rgba(255,255,255,0.4)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      color: 'var(--color-text-dark)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  >
                    {title[0]}
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '100px',
                      padding: '4px 12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-text-dark)',
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    }}
                  >
                    {tag}
                  </span>
                </div>
                {/* Card body with equal height flex structure */}
                <div
                  style={{
                    padding: '1.5rem',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: 'var(--color-text-dark)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-mid)',
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {desc}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginTop: '1.25rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: 'var(--color-text-dark)',
                    }}
                  >
                    View case study <ArrowRight size={13} />
                  </span>
                </div>
              </ClayCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════ */}
      <section
        id="contact"
        className="section"
        style={{
          scrollMarginTop: '110px',
          paddingTop: 'clamp(4rem, 6vw, 6rem)',
          paddingBottom: '6rem',
        }}
      >
        <div className="section-inner">
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <BlobAccent
              color1="#F5DDA0"
              color2="#F5C6A5"
              size={320}
              top="-80px"
              left="-60px"
              opacity={0.5}
              animationDuration={5}
            />
            <BlobAccent
              color1="#C3BFF0"
              color2="#A9DCD9"
              size={260}
              bottom="-60px"
              right="-40px"
              opacity={0.45}
              animationDuration={6.5}
              animationDelay={1}
            />
            <div id="contact-card">
            <ClayCard
              radius="xl"
              style={{
                padding: 'clamp(3rem, 6vw, 5rem)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>Let&apos;s work together</p>
                <h2 className="section-heading" style={{ maxWidth: 480, margin: '0 auto' }}>
                  Have a project in mind?
                </h2>
                <p
                  className="body-lead"
                  style={{ margin: '1.25rem auto 2.5rem', maxWidth: 400 }}
                >
                  Let&apos;s build something your users will love.
                </p>
                <Link href="/contact" className="btn-primary" id="home-cta-bottom">
                  Get a Free Quote <ArrowRight size={16} />
                </Link>
              </div>
            </ClayCard>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
