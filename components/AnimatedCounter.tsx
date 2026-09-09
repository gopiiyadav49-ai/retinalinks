'use client'

import * as React from 'react'

export interface AnimatedCounterProps {
  /** The final numeric value to count up to */
  value: number
  /** Text appended after the number, e.g. "+" or "%" or " Weeks" */
  suffix?: string
  /** Animation duration in milliseconds */
  duration?: number
}

/**
 * Counts up from 0 to `value` once, triggered the first time the element
 * scrolls into the viewport. Does not re-trigger on repeated scroll passes.
 *
 * CLS note: the number span is rendered with `min-width` set to accommodate
 * the widest string (the final value + suffix), so layout never shifts as the
 * digits increase.
 */
export function AnimatedCounter({ value, suffix = '', duration = 1400 }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)
  const ref = React.useRef<HTMLSpanElement>(null)
  // Stable ref to avoid stale closure in the IntersectionObserver callback
  const hasAnimatedRef = React.useRef(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true
          setHasAnimated(true)

          const startTime = performance.now()

          function tick(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic: decelerate toward the end
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayed(Math.round(eased * value))
            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
          // Once fired, unobserve so it never re-triggers
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  // Build the display string
  const displayString = `${displayed}${suffix}`
  // Build the final string for min-width reservation (prevents CLS)
  const finalString = `${value}${suffix}`

  return (
    /*
     * Wrapper span uses display:inline-grid so the hidden aria-label span
     * and the visible content span occupy the same grid cell — this reserves
     * the full final width before the animation starts.
     */
    <span
      ref={ref}
      className="animated-counter"
      aria-label={hasAnimated ? displayString : finalString}
    >
      {/* Invisible spacer — always the final value — locks the width */}
      <span className="animated-counter-sizer" aria-hidden="true">
        {finalString}
      </span>
      {/* Visible animated value — overlaid on top of the sizer */}
      <span className="animated-counter-value" aria-hidden="true">
        {displayString}
      </span>
    </span>
  )
}
