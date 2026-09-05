'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const WORDS = ['Website', 'Mobile App', 'Web App', 'Brand']
const INTERVAL_MS = 2500

export default function AnimatedHeadline({ align = 'left' }: { align?: 'left' | 'center' }) {
  const [index, setIndex] = useState(0)
  const [slotWidth, setSlotWidth] = useState<number | null>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  // Measure the widest word at 1.14em (14% larger) on mount so the slot is fixed-width
  useEffect(() => {
    if (measureRef.current) {
      const el = measureRef.current
      el.style.fontSize = '1.14em'
      let maxW = 0
      WORDS.forEach((w) => {
        el.textContent = w
        maxW = Math.max(maxW, el.offsetWidth)
      })
      el.textContent = ''
      setSlotWidth(maxW + 8) // +8px breathing room
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const isLeft = align === 'left'

  return (
    <h1
      className="display-heading"
      style={{
        textAlign: isLeft ? 'left' : 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'center',
        gap: '0.12em',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Hidden measure element — same font/size with 1.14em scale */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}
      />

      {/* LINE 1 — Controlled explicitly */}
      <span
        style={{
          display: 'block',
          lineHeight: 1.1,
          margin: 0,
          padding: 0,
        }}
      >
        We build your
      </span>

      {/* LINE 2 — Controlled explicitly: rotating word with +14% visual weight */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: isLeft ? 'flex-start' : 'center',
          width: slotWidth ? `${slotWidth}px` : 'auto',
          minWidth: slotWidth ? undefined : '7.5ch',
          position: 'relative',
          overflow: 'hidden',
          lineHeight: 1.2,
          margin: '0.04em 0',
          padding: 0,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              // Visual weight: 14% larger font-size for prominent anchor emphasis
              fontSize: '1.14em',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#3B2A8C',
              paddingBottom: '3px',
              borderBottom: '4px solid #6B54D4',
              lineHeight: 1.15,
            }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* LINE 3 — Controlled explicitly: designed to convert. */}
      <span
        style={{
          display: 'block',
          lineHeight: 1.1,
          margin: 0,
          padding: 0,
          whiteSpace: 'normal',
        }}
      >
        designed to convert.
      </span>
    </h1>
  )
}
