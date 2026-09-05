'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

// ─── 3 Featured Work projects ────────────────────────────────────────────────
const PREVIEWS = [
  {
    name:   'HealthTrack',
    tag:    'Web App',
    accent: '#A9DCD9',
    src:    '/previews/project-web.jpg',
  },
  {
    name:   'StudioFlow',
    tag:    'App',
    accent: '#C3BFF0',
    src:    '/previews/project-app.jpg',
  },
  {
    name:   'Auxano',
    tag:    'Brand & Web',
    accent: '#F5C6A5',
    src:    '/previews/project-brand.jpg',
  },
]

const CARD_W = 180    // px — card width (spec ~160-200px)
const CARD_H = 118    // px — thumbnail height
const CYCLE_MS = 1400 // ms between project crossfades

// ─── Component ───────────────────────────────────────────────────────────────

export default function WorkHoverPreview({ children }: { children: React.ReactNode }) {
  const [visible,  setVisible]  = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [fade,     setFade]     = useState(true)   // true = current img fully visible

  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouch = useRef(false)

  // ── Raw cursor position ────────────────────────────────────────────────────
  const rawX = useMotionValue(-999)
  const rawY = useMotionValue(-999)

  // ── Spring-physics follow — lags behind cursor, giving weight ──────────────
  const springX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 })
  const springY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 })

  // Offset so the card appears up-right of cursor (not covering the link)
  const cardX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 })
  const cardY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 })

  useEffect(() => {
    // Detect touch device once on mount — disable entirely if touch
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
  }, [])

  const startCycle = () => {
    stopCycle()
    cycleTimerRef.current = setInterval(() => {
      // Crossfade: fade out → swap → fade in
      setFade(false)
      setTimeout(() => {
        setImgIndex((i) => (i + 1) % PREVIEWS.length)
        setFade(true)
      }, 200)
    }, CYCLE_MS)
  }

  const stopCycle = () => {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current)
      cycleTimerRef.current = null
    }
  }

  useEffect(() => () => stopCycle(), [])

  const handleMouseEnter = () => {
    if (isTouch.current) return
    setVisible(true)
    startCycle()
  }

  const handleMouseLeave = () => {
    setVisible(false)
    stopCycle()
    setImgIndex(0)
    setFade(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch.current) return
    // Position card up-and-right of cursor, clamped to avoid going off-screen
    const offsetX = 18
    const offsetY = -(CARD_H + 48)
    rawX.set(e.clientX + offsetX)
    rawY.set(e.clientY + offsetY)
    cardX.set(e.clientX + offsetX)
    cardY.set(e.clientY + offsetY)
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* ── Floating preview card — portal-like: fixed to viewport ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          x:             springX,
          y:             springY,
          width:         CARD_W,
          zIndex:        9999,
          pointerEvents: 'none',
          borderRadius:  14,
          background:    'rgba(255,253,250,0.95)',
          boxShadow:     '0 12px 40px rgba(80,60,40,0.14), 0 2px 8px rgba(80,60,40,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          border:        '1px solid rgba(200,180,160,0.25)',
          overflow:      'hidden',
          backdropFilter: 'blur(8px)',
        }}
        initial={{ opacity: 0, scale: 0.88, y: 8 }}
        animate={visible
          ? { opacity: 1,  scale: 1,    y: 0 }
          : { opacity: 0,  scale: 0.88, y: 8 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.5 }}
      >
        {/* Thumbnail area */}
        <div style={{ position: 'relative', width: CARD_W, height: CARD_H, overflow: 'hidden' }}>
          <motion.div
            key={imgIndex}
            animate={{ opacity: fade ? 1 : 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={PREVIEWS[imgIndex].src}
              alt={PREVIEWS[imgIndex].name}
              fill
              sizes={`${CARD_W}px`}
              style={{ objectFit: 'cover' }}
              priority={imgIndex === 0}
            />
          </motion.div>

          {/* Tag pill in thumbnail */}
          <span
            style={{
              position: 'absolute',
              top: 7,
              right: 7,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(6px)',
              borderRadius: '100px',
              padding: '2px 8px',
              fontSize: '0.64rem',
              fontWeight: 700,
              color: 'var(--color-text-dark)',
              letterSpacing: '0.04em',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {PREVIEWS[imgIndex].tag}
          </span>

          {/* Progress dots */}
          <div style={{
            position: 'absolute', bottom: 6, left: 0, right: 0,
            display: 'flex', gap: 4, justifyContent: 'center',
          }}>
            {PREVIEWS.map((_, i) => (
              <div
                key={i}
                style={{
                  width:        i === imgIndex ? 14 : 4,
                  height:       4,
                  borderRadius: 99,
                  background:   i === imgIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                  transition:   'width 0.25s ease, background 0.25s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Label strip */}
        <div style={{
          padding:    '7px 11px 8px',
          display:    'flex',
          alignItems: 'center',
          gap:        6,
        }}>
          {/* Accent dot */}
          <span style={{
            width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
            background: PREVIEWS[imgIndex].accent,
            boxShadow: `0 0 6px ${PREVIEWS[imgIndex].accent}`,
          }} />
          <span style={{
            fontFamily:  'var(--font-display)',
            fontSize:    '0.78rem',
            fontWeight:  700,
            color:       'var(--color-text-dark)',
            letterSpacing: '-0.01em',
            whiteSpace:  'nowrap',
          }}>
            {PREVIEWS[imgIndex].name}
          </span>
          <span style={{
            marginLeft:  'auto',
            fontFamily:  'var(--font-body)',
            fontSize:    '0.65rem',
            fontWeight:  600,
            color:       'var(--color-text-mid)',
            opacity:     0.7,
          }}>
            Featured →
          </span>
        </div>
      </motion.div>
    </span>
  )
}
