'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const STATS = [
  { value: 40,   suffix: '+',      label: 'Projects Delivered',  accent: '#F5C6A5' },
  { value: 98,   suffix: '%',      label: 'Client Satisfaction', accent: '#C3BFF0' },
  { value: 6,    suffix: ' Weeks', label: 'Avg. Launch Time',    accent: '#A9DCD9' },
  { value: 5,    suffix: '+',      label: 'Years Building',      accent: '#F0B8C4' },
]

export default function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState<number[]>([40, 98, 6, 5])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Heading entrance (opacity 0->1, y: 30->0)
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // 2. Stat blocks entrance with stagger
      if (statsContainerRef.current) {
        const items = statsContainerRef.current.querySelectorAll('.stat-block-item')
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // 3. GSAP built-in number tweening from 0 -> target
      const animatedValues = [0, 0, 0, 0]
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          STATS.forEach((stat, index) => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: stat.value,
              duration: 1.5 + index * 0.15,
              ease: 'power2.out',
              onUpdate: () => {
                animatedValues[index] = Math.floor(obj.val)
                setCounts([...animatedValues])
              },
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      style={{
        background:     'var(--color-text-dark)',
        paddingTop:     'clamp(6.5rem, 10vw, 8.5rem)',
        paddingBottom:  'clamp(5rem, 8vw, 7rem)',
        paddingLeft:    '1.5rem',
        paddingRight:   '1.5rem',
        scrollMarginTop:'110px',
        position:       'relative',
        overflow:       'hidden',
        width:          '100%',
      }}
    >
      {/* Atmospheric blobs inside dark section */}
      <div
        aria-hidden
        style={{
          position:     'absolute',
          top:          '-100px',
          right:        '-60px',
          width:        360,
          height:       360,
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(245,198,165,0.10), transparent 70%)',
          pointerEvents:'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position:     'absolute',
          bottom:       '-80px',
          left:         '30%',
          width:        280,
          height:       280,
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(195,191,240,0.08), transparent 70%)',
          pointerEvents:'none',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin:   '0 auto',
          position: 'relative',
          zIndex:   1,
        }}
      >
        {/* Heading block */}
        <div
          ref={headingRef}
          style={{ marginBottom: '3.5rem' }}
        >
          <p
            style={{
              fontSize:      '0.7rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'rgba(250,246,240,0.4)',
              marginBottom:  '0.75rem',
            }}
          >
            By the numbers
          </p>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(1.75rem, 3.5vw, 2.5rem)',
              color:         '#FAF6F0',
              letterSpacing: '-0.03em',
              lineHeight:    1.15,
              maxWidth:      520,
              marginBottom:  '0.75rem',
            }}
          >
            Results that speak for themselves.
          </h2>
          <p
            style={{
              fontSize:  '0.9rem',
              color:     'rgba(250,246,240,0.45)',
              lineHeight: 1.6,
            }}
          >
            Numbers that reflect the work — not just the promise.
          </p>
        </div>

        {/* Stat blocks */}
        <div
          ref={statsContainerRef}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
            gap:                 '1.25rem',
            alignItems:          'start',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-block-item"
              style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'flex-start',
                gap:           '0',
                padding:       '1rem clamp(0.75rem, 2vw, 1.5rem)',
              }}
            >
              {/* Accent dot above number */}
              <span
                style={{
                  display:         'inline-block',
                  width:           28,
                  height:          4,
                  borderRadius:    2,
                  background:      stat.accent,
                  marginBottom:    '1rem',
                  opacity:         0.85,
                }}
              />

              {/* Number */}
              <p
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    800,
                  fontSize:      'clamp(2.75rem, 5vw, 4rem)',
                  color:         '#FAF6F0',
                  letterSpacing: '-0.05em',
                  lineHeight:    1,
                  marginBottom:  '0.5rem',
                }}
              >
                {counts[i]}
                <span style={{ color: stat.accent, fontSize: '0.85em' }}>{stat.suffix}</span>
              </p>

              {/* Label */}
              <p
                style={{
                  fontSize:   '0.85rem',
                  fontWeight: 500,
                  color:      'rgba(250,246,240,0.5)',
                  lineHeight: 1.4,
                  letterSpacing: '0.01em',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
