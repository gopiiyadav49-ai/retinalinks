'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PANELS } from '@/lib/dioramaData'

const ALL_WORDS = PANELS.map((p) => p.label)

export default function AnimatedHeadline({
  align = 'left',
  word,
}: {
  align?: 'left' | 'center'
  word?: string
}) {
  const [slotWidth, setSlotWidth] = useState<number | null>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  // Measure the widest word at 1.14em on mount so the slot is fixed-width
  useEffect(() => {
    if (measureRef.current) {
      const el = measureRef.current
      el.style.fontSize = '1.14em'
      let maxW = 0
      ALL_WORDS.forEach((w) => {
        el.textContent = w
        maxW = Math.max(maxW, el.offsetWidth)
      })
      el.textContent = ''
      setSlotWidth(maxW + 8) // +8px breathing room
    }
  }, [])

  const currentWord = word || ALL_WORDS[0]
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

      {/* LINE 1 */}
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

      {/* LINE 2 — rotating word driven by diorama active panel */}
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
            key={currentWord}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              fontSize: '1.14em',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#3B2A8C',
              paddingBottom: '3px',
              borderBottom: '4px solid #6B54D4',
              lineHeight: 1.15,
            }}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* LINE 3 */}
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
