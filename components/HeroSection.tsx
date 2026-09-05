'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedHeadline from '@/components/AnimatedHeadline'
import HeroBubbles from '@/components/HeroBubbles'
import HeroAtmosphere from '@/components/HeroAtmosphere'
import HeroDioramaLoader from '@/components/HeroDioramaLoader'
import MobileServiceCarousel from '@/components/MobileServiceCarousel'
import WorkHoverPreview from '@/components/WorkHoverPreview'
import { PANELS } from '@/lib/dioramaData'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

export default function HeroSection() {
  const [activePanelIndex, setActivePanelIndex] = useState(0)
  const isMobile = useIsMobile()
  const rotatingWord = PANELS[activePanelIndex]?.label || PANELS[0].label

  return (
    <section
      id="hero-section"
      className="section hero-section"
      style={{
        minHeight: isMobile ? 'auto' : '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'clamp(5.5rem, 10vh, 7.5rem)',
        paddingBottom: isMobile ? '3rem' : 'clamp(4rem, 8vh, 6rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── HERO ATMOSPHERE: WebGL fluid color field ── */}
      <HeroAtmosphere />

      {/* ── HERO BUBBLES: soft floating gradient blobs layered above WebGL ── */}
      <HeroBubbles />

      {/* Hero split layout: Text on LEFT, 3D Data Diorama or Mobile Carousel on RIGHT */}
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

          {/* Animated headline synced to active panel */}
          <AnimatedHeadline align="left" word={rotatingWord} />

          {/* Subtext */}
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

          {/* CTAs */}
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

        {/* RIGHT COLUMN: Mobile Carousel or 3D Diorama Loader */}
        <div
          className="hero-visual-col"
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: isMobile ? 'auto' : 'clamp(540px, 64vh, 680px)',
            width: '100%',
          }}
        >
          {isMobile ? (
            <MobileServiceCarousel
              panels={PANELS}
              activeIndex={activePanelIndex}
              onSelectPanel={setActivePanelIndex}
            />
          ) : (
            <HeroDioramaLoader onActivePanelChange={setActivePanelIndex} />
          )}
        </div>
      </div>
    </section>
  )
}
