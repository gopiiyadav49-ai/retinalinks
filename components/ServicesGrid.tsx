'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import ClayCard from '@/components/ClayCard'
import { ClayIconDisplay } from '@/components/ClayIconButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SERVICES = [
  {
    icon:   MonitorSmartphone,
    accent: 'peach'    as const,
    title:  'Web Design',
    desc:   'Clean, conversion-focused websites built to represent your brand at its best.',
    id:     'service-web-design',
  },
  {
    icon:   Smartphone,
    accent: 'lavender' as const,
    title:  'App Development',
    desc:   'Native and cross-platform mobile apps that feel fast, intuitive, and on-brand.',
    id:     'service-app-dev',
  },
  {
    icon:   LayoutDashboard,
    accent: 'mint'     as const,
    title:  'Web App Development',
    desc:   'Custom web applications and dashboards built for real business workflows.',
    id:     'service-webapp-dev',
  },
  {
    icon:   Sparkles,
    accent: 'pink'     as const,
    title:  'Branding',
    desc:   'Visual identity systems that make your brand instantly recognizable.',
    id:     'service-branding',
  },
]

export default function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.service-card-item')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.75rem',
        alignItems: 'stretch',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {SERVICES.map(({ icon: Icon, accent, title, desc, id }) => (
        <div
          key={id}
          id={id}
          className="service-card-item"
          style={{ display: 'flex' }}
        >
          <ClayCard
            hover
            style={{
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,             // equal-height stretch
            }}
          >
            {/* Icon */}
            <div style={{ alignSelf: 'flex-start' }}>
              <ClayIconDisplay accent={accent} size={56}>
                <Icon size={24} strokeWidth={1.6} style={{ color: 'var(--color-text-dark)', position: 'relative', zIndex: 1 }} />
              </ClayIconDisplay>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    700,
                fontSize:      '1.125rem',
                color:         'var(--color-text-dark)',
                letterSpacing: '-0.015em',
                marginTop:     '1.375rem',
                marginBottom:  '0.5rem',
              }}
            >
              {title}
            </h3>

            {/* Description — flex-grow pushes link to bottom */}
            <p
              style={{
                fontSize:   '0.9rem',
                color:      'var(--color-text-mid)',
                lineHeight: 1.75,
                flexGrow:   1,
              }}
            >
              {desc}
            </p>

            {/* Learn more link */}
            <LearnMoreLink />
          </ClayCard>
        </div>
      ))}
    </div>
  )
}

// Separate tiny component so we can manage hover state cleanly
function LearnMoreLink() {
  return (
    <motion.div
      style={{ marginTop: '1.5rem' }}
      initial="rest"
      whileHover="hover"
    >
      <Link
        href="/services"
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '5px',
          fontSize:       '0.85rem',
          fontWeight:     600,
          color:          'var(--color-text-dark)',
          textDecoration: 'none',
        }}
      >
        <span>Learn more</span>
        <motion.span
          variants={{
            rest:  { x: 0 },
            hover: { x: 4 },
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <ArrowRight size={14} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  )
}
