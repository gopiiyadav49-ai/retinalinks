'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEYWORDS = [
  'Website Development',
  'Graphic Designing',
  'App Development',
  'Poster Design',
  'Logo Design',
  'UI/UX Design',
  'Branding',
  'Web Apps',
  'SEO',
]

const ACCENT_COLORS = [
  { bg: 'rgba(245, 198, 165, 0.45)', border: 'rgba(245, 198, 165, 0.65)' }, // peach
  { bg: 'rgba(195, 191, 240, 0.45)', border: 'rgba(195, 191, 240, 0.65)' }, // lavender
  { bg: 'rgba(169, 220, 217, 0.45)', border: 'rgba(169, 220, 217, 0.65)' }, // mint
  { bg: 'rgba(240, 184, 196, 0.45)', border: 'rgba(240, 184, 196, 0.65)' }, // pink
  { bg: 'rgba(245, 221, 160, 0.45)', border: 'rgba(245, 221, 160, 0.65)' }, // butter
]

interface FallingPill {
  id: number
  text: string
  left: number        // percentage across hero (6% to 88%)
  targetY: number     // px resting position (140px to 540px)
  rotation: number    // resting tilt (-7deg to +7deg)
  scale: number       // 0.85 to 1.02 for depth
  accentIdx: number
}

export default function FallingKeywords() {
  const [items, setItems] = useState<FallingPill[]>([])

  useEffect(() => {
    let count = 0
    let keywordIdx = 0

    // Seed initial 2-3 items at rest so hero isn't empty initially
    const initialSeed: FallingPill[] = [
      {
        id: ++count,
        text: KEYWORDS[0],
        left: 12,
        targetY: 220,
        rotation: -4,
        scale: 0.95,
        accentIdx: 0,
      },
      {
        id: ++count,
        text: KEYWORDS[2],
        left: 82,
        targetY: 340,
        rotation: 5,
        scale: 0.9,
        accentIdx: 1,
      },
      {
        id: ++count,
        text: KEYWORDS[5],
        left: 74,
        targetY: 180,
        rotation: -3,
        scale: 0.92,
        accentIdx: 2,
      },
    ]
    setItems(initialSeed)
    keywordIdx = 3

    // Spawn a new keyword every 2.2 seconds
    const interval = setInterval(() => {
      keywordIdx = (keywordIdx + 1) % KEYWORDS.length
      const text = KEYWORDS[keywordIdx]

      // Determine left position (cluster more on left and right flanks, avoiding direct dead center)
      const isLeftFlank = Math.random() > 0.5
      const left = isLeftFlank
        ? 6 + Math.random() * 26   // 6% - 32%
        : 68 + Math.random() * 24  // 68% - 92%

      // Target resting Y in px within the hero bounds
      const targetY = 160 + Math.random() * 420

      // Natural random tilt
      const rotation = -7 + Math.random() * 14
      const scale = 0.86 + Math.random() * 0.16
      const accentIdx = Math.floor(Math.random() * ACCENT_COLORS.length)

      const newPill: FallingPill = {
        id: ++count,
        text,
        left,
        targetY,
        rotation,
        scale,
        accentIdx,
      }

      setItems((prev) => {
        // Keep at most 5 items active at once for optimal performance
        const trimmed = prev.length >= 5 ? prev.slice(prev.length - 4) : prev
        return [...trimmed, newPill]
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <AnimatePresence>
        {items.map((item) => {
          const accent = ACCENT_COLORS[item.accentIdx]
          return (
            <motion.div
              key={item.id}
              initial={{
                y: -90,
                opacity: 0,
                scale: item.scale * 0.9,
                rotate: item.rotation - 12,
              }}
              animate={{
                y: item.targetY,
                opacity: 0.32, // Low opacity (20-35%) so it stays ambient
                scale: item.scale,
                rotate: item.rotation,
              }}
              exit={{
                opacity: 0,
                filter: 'blur(3px)',
                transition: { duration: 1.2, ease: 'easeOut' },
              }}
              transition={{
                // Natural gravity drop with soft spring bounce settle
                type: 'spring',
                stiffness: 48,
                damping: 11,
                mass: 0.85,
              }}
              style={{
                position: 'absolute',
                left: `${item.left}%`,
                top: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: accent.bg,
                border: `1px solid ${accent.border}`,
                borderRadius: '100px',
                padding: '5px 14px',
                boxShadow: '0 4px 14px rgba(200, 160, 130, 0.12)',
              }}
            >
              {/* Subtle decorative dot */}
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--color-text-mid)',
                  opacity: 0.5,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--color-text-dark)',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.text}
              </span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
