'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface BlobAccentProps {
  color1: string
  color2: string
  color3?: string          // optional third stop for richer gradient
  size?: number            // px diameter
  top?: string
  left?: string
  right?: string
  bottom?: string
  opacity?: number
  blur?: number            // px blur — default 40
  animationDelay?: number
  animationDuration?: number
  parallaxStrength?: number  // 0–1, default 0.025
  className?: string
}

export default function BlobAccent({
  color1,
  color2,
  color3,
  size = 480,
  top,
  left,
  right,
  bottom,
  opacity = 0.55,
  blur = 40,
  animationDelay = 0,
  animationDuration = 6,
  parallaxStrength = 0.025,
  className = '',
}: BlobAccentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Smooth mouse-parallax
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 40, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 40, damping: 20 })

  // Blob moves OPPOSITE to cursor (atmospheric parallax)
  const moveX = useTransform(springX, (v) => v * -parallaxStrength * size * 0.12)
  const moveY = useTransform(springY, (v) => v * -parallaxStrength * size * 0.12)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      rawX.set(e.clientX - cx)
      rawY.set(e.clientY - cy)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  const gradient = color3
    ? `radial-gradient(circle at 35% 30%, ${color1} 0%, ${color2} 55%, ${color3} 100%)`
    : `radial-gradient(circle at 35% 30%, ${color1} 0%, ${color2} 100%)`

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{
        top,
        left,
        right,
        bottom,
        width:  size,
        height: size,
        borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
        background: gradient,
        opacity,
        filter: `blur(${blur}px)`,
        zIndex: 0,
        x: moveX,
        y: moveY,
      }}
      animate={{
        // Float — layered on top of parallax via Framer's y
        y:      [0, -20, -10, 0],
        rotate: [0, 5,   -4,  0],
        scale:  [1, 1.03, 1.01, 1],
        borderRadius: [
          '60% 40% 55% 45% / 45% 55% 40% 60%',
          '52% 48% 62% 38% / 50% 48% 52% 50%',
          '48% 52% 50% 50% / 58% 42% 58% 42%',
          '60% 40% 55% 45% / 45% 55% 40% 60%',
        ],
      }}
      transition={{
        duration:   animationDuration,
        delay:      animationDelay,
        repeat:     Infinity,
        ease:       'easeInOut',
        // Each property can have its own timing if needed
        borderRadius: { duration: animationDuration, ease: 'easeInOut', repeat: Infinity },
      }}
    />
  )
}
