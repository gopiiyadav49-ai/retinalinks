'use client'

import * as React from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Testimonial } from '@/lib/db/schema'

// ---------------------------------------------------------------------------
// Fallback data — shown when DB is unreachable. Mirrors seed-testimonials.ts.
// TODO: replace with real client testimonials before this section goes live —
// do not publish placeholder names/quotes as real.
// ---------------------------------------------------------------------------
export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      'Retinalinks took our idea and shipped something better than what we pitched them. Fast, communicative, no surprises.',
    name: 'Placeholder Client',
    role: 'Founder',
    company: 'Placeholder Co.',
    photoUrl: null,
    order: 1,
  },
  {
    id: 2,
    quote:
      "The best part wasn't even the design — it was how easy they were to work with across time zones.",
    name: 'Placeholder Client',
    role: 'Product Lead',
    company: 'Placeholder Co.',
    photoUrl: null,
    order: 2,
  },
]

// ---------------------------------------------------------------------------
// Avatar — circular client photo or initials fallback
// ---------------------------------------------------------------------------
function Avatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        className="tst-avatar"
        width={44}
        height={44}
      />
    )
  }

  return (
    <div className="tst-avatar tst-avatar-initials" aria-label={name}>
      {initials}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ChevronLeft / ChevronRight icons (inline SVG, no extra dep)
// ---------------------------------------------------------------------------
function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// TestimonialsCarousel — the interactive carousel
// ---------------------------------------------------------------------------
interface CarouselProps {
  items: Testimonial[]
}

export function TestimonialsCarousel({ items }: CarouselProps) {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  // Transition direction for crossfade (unused when reduced motion)
  const [transitioning, setTransitioning] = React.useState(false)

  const total = items.length

  // Wrap index safely
  const go = React.useCallback(
    (next: number) => {
      const wrapped = ((next % total) + total) % total
      if (wrapped === active) return
      if (shouldReduceMotion) {
        setActive(wrapped)
        return
      }
      setTransitioning(true)
      // After fade-out (200ms), swap content and fade in
      setTimeout(() => {
        setActive(wrapped)
        setTransitioning(false)
      }, 200)
    },
    [active, total, shouldReduceMotion],
  )

  const prev = React.useCallback(() => go(active - 1), [active, go])
  const next = React.useCallback(() => go(active + 1), [active, go])

  // Autoplay — 5s hold, pauses on hover or focus-within
  React.useEffect(() => {
    if (isHovered) return
    const id = setInterval(() => go(active + 1), 5000)
    return () => clearInterval(id)
  }, [active, go, isHovered])

  // Touch swipe
  const touchStartX = React.useRef<number | null>(null)

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return // too small — not a swipe
    if (delta < 0) next()
    else prev()
  }

  const item = items[active]

  return (
    <div
      className="tst-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/*
       * Fixed-height card container — the aria-live region announces changes
       * to screen readers. CSS transition is opacity only (no height change)
       * so there is zero layout shift as testimonials swap.
       */}
      <div
        className={`tst-card${transitioning ? ' tst-card--out' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Large decorative quote mark */}
        <div className="tst-quote-mark" aria-hidden="true">&ldquo;</div>

        {/* Quote text — in real DOM, crawlable */}
        <blockquote className="tst-quote">
          <p>{item.quote}</p>
        </blockquote>

        {/* Attribution */}
        <div className="tst-attribution">
          <Avatar name={item.name} photoUrl={item.photoUrl} />
          <div className="tst-attribution-text">
            <span className="tst-name">{item.name}</span>
            <span className="tst-role">
              {item.role}
              {item.company ? `, ${item.company}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation row: prev arrow, dots, next arrow */}
      <div className="tst-nav">
        <button
          className="tst-arrow"
          onClick={prev}
          aria-label="Previous testimonial"
          type="button"
        >
          <ChevronLeft />
        </button>

        <div className="tst-dots" role="tablist" aria-label="Testimonial navigation">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1} of ${total}`}
              className={`tst-dot${i === active ? ' tst-dot--active' : ''}`}
              onClick={() => go(i)}
              type="button"
            />
          ))}
        </div>

        <button
          className="tst-arrow"
          onClick={next}
          aria-label="Next testimonial"
          type="button"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
