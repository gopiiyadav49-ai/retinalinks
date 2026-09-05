'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════
// DURATION CONSTANTS (Tuneable, defined once at top of file)
// ═══════════════════════════════════════════════════════════════════════════
const ZOOM_DURATION_MS = 4000
const BURST_DURATION_MS = 800
const FLOAT_DURATION_MS = 5000
const REFORM_DURATION_MS = 1000
const HOLD_DURATION_MS = 700

// ═══════════════════════════════════════════════════════════════════════════
// 1 — DATA STRUCTURE: DEFINE HOME POSITIONS
// ═══════════════════════════════════════════════════════════════════════════
export type Node = {
  id: string
  type: 'pill' | 'dot'
  label?: string // only for type 'pill', e.g. "Branding"
  color: string // accent color for this node
  homeX: number // fixed X position relative to the ring's center (px)
  homeY: number // fixed Y position relative to the ring's center (px)
  radius: number // distance from center — used for circular arrangement
  angle: number // angular position around the ring (radians)
  dotSize?: number // for decorative dots (px)
  pulseDelay?: number // subtle pulse delay for texture during zooming
}

// ── PILL NODES (8 items around radius 175px) ──────────────────────────────
// Labels & colors preserved exactly from existing system:
// Branding (#EC4899), Website Development (#0EA5E9), Web Apps (#06B6D4),
// App Development (#6366F1), UI/UX Design (#A855F7), SEO (#F43F5E),
// Poster Design (#10B981), Logo Design (#F59E0B)
const PILL_RADIUS = 175

const PILL_NODES: Node[] = [
  {
    id: 'pill-web-dev',
    type: 'pill',
    label: 'Website Development',
    color: '#0EA5E9',
    radius: PILL_RADIUS,
    angle: -Math.PI / 2, // -90 deg (Top)
    homeX: 0,
    homeY: -PILL_RADIUS,
  },
  {
    id: 'pill-app-dev',
    type: 'pill',
    label: 'App Development',
    color: '#6366F1',
    radius: PILL_RADIUS,
    angle: -Math.PI / 4, // -45 deg (Top Right)
    homeX: 123.74,
    homeY: -123.74,
  },
  {
    id: 'pill-ui-ux',
    type: 'pill',
    label: 'UI/UX Design',
    color: '#A855F7',
    radius: PILL_RADIUS,
    angle: 0, // 0 deg (Right)
    homeX: PILL_RADIUS,
    homeY: 0,
  },
  {
    id: 'pill-web-apps',
    type: 'pill',
    label: 'Web Apps',
    color: '#06B6D4',
    radius: PILL_RADIUS,
    angle: Math.PI / 4, // 45 deg (Bottom Right)
    homeX: 123.74,
    homeY: 123.74,
  },
  {
    id: 'pill-seo',
    type: 'pill',
    label: 'SEO',
    color: '#F43F5E',
    radius: PILL_RADIUS,
    angle: Math.PI / 2, // 90 deg (Bottom)
    homeX: 0,
    homeY: PILL_RADIUS,
  },
  {
    id: 'pill-poster-design',
    type: 'pill',
    label: 'Poster Design',
    color: '#10B981',
    radius: PILL_RADIUS,
    angle: (3 * Math.PI) / 4, // 135 deg (Bottom Left)
    homeX: -123.74,
    homeY: 123.74,
  },
  {
    id: 'pill-logo-design',
    type: 'pill',
    label: 'Logo Design',
    color: '#F59E0B',
    radius: PILL_RADIUS,
    angle: Math.PI, // 180 deg (Left)
    homeX: -PILL_RADIUS,
    homeY: 0,
  },
  {
    id: 'pill-branding',
    type: 'pill',
    label: 'Branding',
    color: '#EC4899',
    radius: PILL_RADIUS,
    angle: (5 * Math.PI) / 4, // 225 deg (Top Left)
    homeX: -123.74,
    homeY: -123.74,
  },
]

// ── DECORATIVE DOT NODES (28 dots across concentric radii matching ring pattern)
// Computed once via polar-to-cartesian: homeX = round(cos(angle) * r), homeY = round(sin(angle) * r)
const DOT_NODES: Node[] = [
  // Inner ring: r = 68px (6 dots)
  { id: 'dot-in-1', type: 'dot', color: '#0EA5E9', radius: 68, angle: 0, homeX: 68, homeY: 0, dotSize: 5, pulseDelay: 0.1 },
  { id: 'dot-in-2', type: 'dot', color: '#6366F1', radius: 68, angle: 1.05, homeX: 34, homeY: 58.9, dotSize: 4.5, pulseDelay: 0.4 },
  { id: 'dot-in-3', type: 'dot', color: '#A855F7', radius: 68, angle: 2.09, homeX: -34, homeY: 58.9, dotSize: 5.5, pulseDelay: 0.7 },
  { id: 'dot-in-4', type: 'dot', color: '#EC4899', radius: 68, angle: 3.14, homeX: -68, homeY: 0, dotSize: 4.5, pulseDelay: 0.2 },
  { id: 'dot-in-5', type: 'dot', color: '#06B6D4', radius: 68, angle: 4.19, homeX: -34, homeY: -58.9, dotSize: 5, pulseDelay: 0.5 },
  { id: 'dot-in-6', type: 'dot', color: '#10B981', radius: 68, angle: 5.24, homeX: 34, homeY: -58.9, dotSize: 4.5, pulseDelay: 0.8 },

  // Middle ring: r = 118px (8 dots)
  { id: 'dot-mid-1', type: 'dot', color: '#6366F1', radius: 118, angle: 0.39, homeX: 109, homeY: 45.2, dotSize: 5, pulseDelay: 0.15 },
  { id: 'dot-mid-2', type: 'dot', color: '#0EA5E9', radius: 118, angle: 1.18, homeX: 45.2, homeY: 109, dotSize: 6, pulseDelay: 0.35 },
  { id: 'dot-mid-3', type: 'dot', color: '#F43F5E', radius: 118, angle: 1.96, homeX: -45.2, homeY: 109, dotSize: 5, pulseDelay: 0.55 },
  { id: 'dot-mid-4', type: 'dot', color: '#A855F7', radius: 118, angle: 2.75, homeX: -109, homeY: 45.2, dotSize: 4.5, pulseDelay: 0.75 },
  { id: 'dot-mid-5', type: 'dot', color: '#F59E0B', radius: 118, angle: 3.53, homeX: -109, homeY: -45.2, dotSize: 5.5, pulseDelay: 0.25 },
  { id: 'dot-mid-6', type: 'dot', color: '#10B981', radius: 118, angle: 4.32, homeX: -45.2, homeY: -109, dotSize: 4.5, pulseDelay: 0.45 },
  { id: 'dot-mid-7', type: 'dot', color: '#06B6D4', radius: 118, angle: 5.11, homeX: 45.2, homeY: -109, dotSize: 6, pulseDelay: 0.65 },
  { id: 'dot-mid-8', type: 'dot', color: '#EC4899', radius: 118, angle: 5.89, homeX: 109, homeY: -45.2, dotSize: 5, pulseDelay: 0.85 },

  // Orbit ring buffer dots (nestled between pills at r = 175px) (8 dots)
  { id: 'dot-orb-1', type: 'dot', color: '#0EA5E9', radius: 175, angle: -1.18, homeX: 67, homeY: -161.7, dotSize: 5, pulseDelay: 0.2 },
  { id: 'dot-orb-2', type: 'dot', color: '#6366F1', radius: 175, angle: -0.39, homeX: 161.7, homeY: -67, dotSize: 5.5, pulseDelay: 0.4 },
  { id: 'dot-orb-3', type: 'dot', color: '#A855F7', radius: 175, angle: 0.39, homeX: 161.7, homeY: 67, dotSize: 4.5, pulseDelay: 0.6 },
  { id: 'dot-orb-4', type: 'dot', color: '#06B6D4', radius: 175, angle: 1.18, homeX: 67, homeY: 161.7, dotSize: 6, pulseDelay: 0.8 },
  { id: 'dot-orb-5', type: 'dot', color: '#F43F5E', radius: 175, angle: 1.96, homeX: -67, homeY: 161.7, dotSize: 5, pulseDelay: 0.3 },
  { id: 'dot-orb-6', type: 'dot', color: '#10B981', radius: 175, angle: 2.75, homeX: -161.7, homeY: 67, dotSize: 4.5, pulseDelay: 0.5 },
  { id: 'dot-orb-7', type: 'dot', color: '#F59E0B', radius: 175, angle: 3.53, homeX: -161.7, homeY: -67, dotSize: 5.5, pulseDelay: 0.7 },
  { id: 'dot-orb-8', type: 'dot', color: '#EC4899', radius: 175, angle: 4.32, homeX: -67, homeY: -161.7, dotSize: 5, pulseDelay: 0.9 },

  // Outer ring: r = 215px (6 perimeter beacons)
  { id: 'dot-out-1', type: 'dot', color: '#0EA5E9', radius: 215, angle: 0.52, homeX: 186.2, homeY: 107.5, dotSize: 6, pulseDelay: 0.1 },
  { id: 'dot-out-2', type: 'dot', color: '#6366F1', radius: 215, angle: 1.57, homeX: 0, homeY: 215, dotSize: 5.5, pulseDelay: 0.3 },
  { id: 'dot-out-3', type: 'dot', color: '#EC4899', radius: 215, angle: 2.62, homeX: -186.2, homeY: 107.5, dotSize: 6, pulseDelay: 0.5 },
  { id: 'dot-out-4', type: 'dot', color: '#10B981', radius: 215, angle: 3.67, homeX: -186.2, homeY: -107.5, dotSize: 5, pulseDelay: 0.7 },
  { id: 'dot-out-5', type: 'dot', color: '#A855F7', radius: 215, angle: 4.71, homeX: 0, homeY: -215, dotSize: 6.5, pulseDelay: 0.2 },
  { id: 'dot-out-6', type: 'dot', color: '#06B6D4', radius: 215, angle: 5.76, homeX: 186.2, homeY: -107.5, dotSize: 5, pulseDelay: 0.6 },
]

// Fixed constant nodes array — identical every cycle for 100% pixel-perfect reform
const ALL_NODES: Node[] = [...PILL_NODES, ...DOT_NODES]

// Pre-computed static radial ticks at module-level (strictly deterministic, zero inline trig)
const RADIAL_TICKS = Array.from({ length: 24 }).map((_, i) => {
  const rad = (i / 24) * Math.PI * 2
  const r1 = 210
  const r2 = i % 3 === 0 ? 220 : 216
  return {
    key: `tick-${i}`,
    x1: Math.round(Math.cos(rad) * r1 * 100) / 100,
    y1: Math.round(Math.sin(rad) * r1 * 100) / 100,
    x2: Math.round(Math.cos(rad) * r2 * 100) / 100,
    y2: Math.round(Math.sin(rad) * r2 * 100) / 100,
    isMajor: i % 3 === 0,
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// 2 — STATE MACHINE TYPES
// ═══════════════════════════════════════════════════════════════════════════
export type Phase = 'zooming' | 'bursting' | 'floating' | 'reforming' | 'holding'

export default function OrbitalRingSystem() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Single state variable driving the whole system
  const [phase, setPhase] = useState<Phase>('zooming')

  // Dynamic target scale: initialized safely to 1.15 and computed dynamically
  const [targetScale, setTargetScale] = useState(1.15)

  // ═════════════════════════════════════════════════════════════════════════
  // BURST & DRIFT CACHES (Precomputed ONCE per burst cycle — Section 8)
  // ═════════════════════════════════════════════════════════════════════════
  const cycleCountRef = useRef(0)
  const lastBurstCycleRef = useRef(-1)
  const burstVectorsRef = useRef<Record<string, { burstX: number; burstY: number }>>({})
  const driftParamsRef = useRef<Record<string, { offsetX: number; offsetY: number; duration: number }>>({})

  // Compute burst vectors once upon entering 'bursting'
  if (phase === 'bursting' && lastBurstCycleRef.current !== cycleCountRef.current) {
    lastBurstCycleRef.current = cycleCountRef.current
    const newVectors: Record<string, { burstX: number; burstY: number }> = {}
    const newDrifts: Record<string, { offsetX: number; offsetY: number; duration: number }> = {}

    ALL_NODES.forEach((node) => {
      // Outward burst vector: randomAngle 0-360deg, randomDistance roughly 200-500px
      const randomAngle = Math.random() * Math.PI * 2
      const randomDistance = 200 + Math.random() * 300
      newVectors[node.id] = {
        burstX: Math.cos(randomAngle) * randomDistance,
        burstY: Math.sin(randomAngle) * randomDistance,
      }
      // Floating drift wobble: independent duration 4-7s, small offsets ±15-30px
      newDrifts[node.id] = {
        offsetX: (Math.random() - 0.5) * 50,
        offsetY: (Math.random() - 0.5) * 50,
        duration: 4 + Math.random() * 3,
      }
    })

    burstVectorsRef.current = newVectors
    driftParamsRef.current = newDrifts
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3 — CONSTRAINED DYNAMIC TARGET SCALE CALCULATION (FIX 1)
  // Evaluates both vertical fit and horizontal boundary to the left text column,
  // taking whichever scale value is SMALLER so it never overlaps the text.
  // ═════════════════════════════════════════════════════════════════════════
  const computeScale = React.useCallback(() => {
    if (!containerRef.current) return

    // 1. Vertical scale calculation (hero section fit)
    const heroEl = containerRef.current.closest('.hero-section') as HTMLElement | null
    const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight
    const currentRingDiameter = 350
    const verticalScale = (heroHeight / currentRingDiameter) * 0.95

    // 2. Horizontal scale calculation (constrained by left text column + safe gap)
    const ringRect = containerRef.current.getBoundingClientRect()
    const ringCenterX = ringRect.left + ringRect.width / 2

    // Find the hero text column
    const heroGrid = containerRef.current.closest('.hero-split-grid')
    const textCol = (heroGrid?.querySelector('.hero-text-col') || document.querySelector('.hero-text-col')) as HTMLElement | null

    let horizontalScale = verticalScale

    if (textCol) {
      const textRect = textCol.getBoundingClientRect()
      let maxTextRight = textRect.right
      const textElements = textCol.querySelectorAll('h1, h2, h3, p, div, a, span')
      textElements.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.right > maxTextRight) maxTextRight = r.right
      })

      // If side-by-side layout where text is to the left of the ring center
      if (maxTextRight < ringCenterX) {
        // Safe margin: 40-60px gap per user spec (using 50px safe gap)
        const SAFE_MARGIN_PX = 50
        const leftBoundary = maxTextRight + SAFE_MARGIN_PX
        const availableDistance = Math.max(0, ringCenterX - leftBoundary)

        // Base max reach of the leftmost elements at 1x scale:
        // 'Logo Design' pill is at homeX = -175px, pill width ~115px (half-width ~58px),
        // reaching ~235-245px from the ring center.
        const BASE_LEFT_REACH = 245

        horizontalScale = availableDistance / BASE_LEFT_REACH
      } else {
        // Stacked layout (mobile): constrain by screen edge with safe margin
        const SAFE_MARGIN_PX = 20
        const availableDistance = Math.max(0, ringCenterX - SAFE_MARGIN_PX)
        const BASE_LEFT_REACH = 245
        horizontalScale = availableDistance / BASE_LEFT_REACH
      }
    }

    // 3. Take WHICHEVER IS SMALLER — ensures ring never grows past the safe boundary
    const constrainedScale = Math.max(1.0, Math.min(verticalScale, horizontalScale))
    setTargetScale(constrainedScale)
  }, [])

  // ═════════════════════════════════════════════════════════════════════════
  // 2 — STATE MACHINE: SINGLE useEffect + setTimeout CHAIN
  // ═════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (phase === 'zooming') {
      computeScale()
      const t = setTimeout(() => setPhase('bursting'), ZOOM_DURATION_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'bursting') {
      const t = setTimeout(() => setPhase('floating'), BURST_DURATION_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'floating') {
      const t = setTimeout(() => setPhase('reforming'), FLOAT_DURATION_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'reforming') {
      const t = setTimeout(() => setPhase('holding'), REFORM_DURATION_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'holding') {
      computeScale()
      cycleCountRef.current += 1
      const t = setTimeout(() => setPhase('zooming'), HOLD_DURATION_MS)
      return () => clearTimeout(t)
    }
  }, [phase, computeScale])

  useEffect(() => {
    computeScale()
    window.addEventListener('resize', computeScale)
    window.addEventListener('orientationchange', computeScale)

    const t = setTimeout(computeScale, 200)

    return () => {
      window.removeEventListener('resize', computeScale)
      window.removeEventListener('orientationchange', computeScale)
      clearTimeout(t)
    }
  }, [computeScale])

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER: MOTION CONFIGURATIONS PER PHASE
  // ═════════════════════════════════════════════════════════════════════════
  const isHolding = phase === 'holding'
  const isZooming = phase === 'zooming'
  const isBursting = phase === 'bursting'
  const isFloating = phase === 'floating'
  const isReforming = phase === 'reforming'
  const isScattered = isBursting || isFloating

  return (
    <div
      ref={containerRef}
      aria-label="Interactive Orbital Ring System"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        pointerEvents: isHolding ? 'auto' : 'none',
        userSelect: 'none',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          3 — PHASE: ZOOMING CONTAINER
          Scales up from 1x to targetScale during 'zooming', resets to 1 otherwise.
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        animate={{
          scale: isZooming ? targetScale : 1,
        }}
        transition={{
          duration: isZooming
            ? ZOOM_DURATION_MS / 1000
            : isBursting
            ? BURST_DURATION_MS / 1000
            : 0.6,
          ease: isZooming ? 'easeInOut' : 'easeOut',
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformOrigin: 'center center',
        }}
      >
        {/* ── TECHNICAL ORBITAL RINGS & 3D CORE GRAPHIC ── */}
        <motion.div
          animate={{
            opacity: isBursting || isFloating ? 0 : 1,
            scale: isBursting || isFloating ? 0.8 : 1,
          }}
          transition={{
            duration: isBursting ? 0.3 : isReforming ? REFORM_DURATION_MS / 1000 : 0.4,
            ease: isReforming ? 'easeIn' : 'easeOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* SVG Concentric Technical Rings with tick marks and telemetry */}
          <svg
            viewBox="-240 -240 480 480"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <radialGradient id="ringCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#6366F1" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#818CF8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Central Glow Field */}
            <circle cx="0" cy="0" r="85" fill="url(#ringCoreGrad)" />

            {/* Inner Ring (r = 68) */}
            <circle
              cx="0"
              cy="0"
              r="68"
              fill="none"
              stroke="rgba(14, 165, 233, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="6 6"
            />

            {/* Middle Ring (r = 118) */}
            <circle
              cx="0"
              cy="0"
              r="118"
              fill="none"
              stroke="rgba(99, 102, 241, 0.40)"
              strokeWidth="1.1"
              strokeDasharray="12 8"
            />

            {/* Main Orbit Ring on which Pills Sit (r = 175) */}
            <circle
              cx="0"
              cy="0"
              r="175"
              fill="none"
              stroke="url(#orbitGrad)"
              strokeWidth="1.3"
              strokeDasharray="5 7"
            />

            {/* Outer Perimeter Ring (r = 215) with subtle tick marks */}
            <circle
              cx="0"
              cy="0"
              r="215"
              fill="none"
              stroke="rgba(129, 140, 248, 0.32)"
              strokeWidth="1"
              strokeDasharray="3 14"
            />

            {/* Radial Ticks at perimeter (pre-computed static values) */}
            {RADIAL_TICKS.map((tick) => (
              <line
                key={tick.key}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.isMajor ? 'rgba(99, 102, 241, 0.55)' : 'rgba(99, 102, 241, 0.25)'}
                strokeWidth={tick.isMajor ? 1.4 : 0.8}
              />
            ))}

            {/* Central Gyroscope Rings */}
            <g style={{ transformOrigin: '0 0' }}>
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="18"
                fill="none"
                stroke="rgba(14, 165, 233, 0.55)"
                strokeWidth="1.2"
                transform="rotate(-25)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="18"
                fill="none"
                stroke="rgba(168, 85, 247, 0.50)"
                strokeWidth="1.2"
                transform="rotate(35)"
              />
              <circle cx="0" cy="0" r="9" fill="#0EA5E9" fillOpacity="0.25" />
              <circle cx="0" cy="0" r="4.5" fill="#6366F1" />
            </g>
          </svg>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            NODE LAYER (PILLS + DECORATIVE DOTS)
            Maintained permanently mounted across all phases (Section 8)
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            pointerEvents: isHolding ? 'auto' : 'none',
          }}
        >
          {ALL_NODES.map((node) => {
            const burst = burstVectorsRef.current[node.id] || { burstX: 0, burstY: 0 }
            const drift = driftParamsRef.current[node.id] || { offsetX: 0, offsetY: 0, duration: 5 }

            // Target position: scattered during bursting & floating, home during zoom, reform, hold
            const targetX = isScattered ? node.homeX + burst.burstX : node.homeX
            const targetY = isScattered ? node.homeY + burst.burstY : node.homeY

            const isPill = node.type === 'pill'

            // Section 4 & 6 timing:
            // Burst: easeOut decelerating (fast start)
            // Reform: easeIn accelerating toward center (like pulled back together)
            const positionTransition = isBursting
              ? { duration: BURST_DURATION_MS / 1000, ease: 'easeOut' as const }
              : isReforming
              ? { duration: REFORM_DURATION_MS / 1000, ease: 'easeIn' as const }
              : { duration: 0.1 }

            return (
              <motion.div
                key={node.id}
                animate={{
                  x: targetX,
                  y: targetY,
                }}
                transition={positionTransition}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transformOrigin: 'center center',
                  zIndex: isPill ? 30 : 15,
                }}
              >
                {/* ═════════════════════════════════════════════════════════
                    5 — FLOATING DRIFT LAYER
                    Runs independent wobble per particle during 'floating'
                ═════════════════════════════════════════════════════════ */}
                <motion.div
                  animate={
                    isFloating
                      ? {
                          x: [0, drift.offsetX, 0],
                          y: [0, drift.offsetY, 0],
                        }
                      : { x: 0, y: 0 }
                  }
                  transition={
                    isFloating
                      ? {
                          duration: drift.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                      : { duration: isReforming ? REFORM_DURATION_MS / 1000 : 0.2 }
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isPill ? (
                    /* ── PILL NODE ── */
                    <motion.div
                      animate={{
                        // Pills shrink & fade to 0 over ~300ms in burst (Section 4), fade back in on reform (Section 6)
                        opacity: isBursting || isFloating ? 0 : 1,
                        scale: isBursting || isFloating ? 0 : 1,
                      }}
                      transition={{
                        duration: isBursting
                          ? 0.3 // ~300ms fade/shrink per spec
                          : isReforming
                          ? REFORM_DURATION_MS / 1000 // easeIn fade back
                          : 0.2,
                        ease: isReforming ? 'easeIn' : 'easeOut',
                      }}
                      whileHover={
                        isHolding
                          ? {
                              scale: 1.08,
                              y: -2,
                              boxShadow: `0 8px 24px rgba(45,27,105,0.18), 0 0 16px ${node.color}40`,
                              transition: { duration: 0.18 },
                            }
                          : undefined
                      }
                      style={{
                        transform: 'translate(-50%, -50%)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${node.color}55`,
                        boxShadow: `0 4px 14px rgba(30, 27, 75, 0.08), 0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)`,
                        whiteSpace: 'nowrap',
                        cursor: isHolding ? 'pointer' : 'default',
                        pointerEvents: isHolding ? 'auto' : 'none',
                      }}
                    >
                      {/* Status indicator dot inside pill */}
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: node.color,
                          boxShadow: `0 0 8px ${node.color}`,
                          flexShrink: 0,
                          display: 'inline-block',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 650,
                          color: '#1E1B4B',
                          letterSpacing: '-0.01em',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}
                      >
                        {node.label}
                      </span>
                    </motion.div>
                  ) : (
                    /* ── DECORATIVE DOT NODE ── */
                    <motion.div
                      animate={{
                        // Dots scale up slightly in burst as particles (Section 4)
                        scale: isBursting ? 1.4 : isFloating ? 1.25 : 1,
                        opacity: isBursting ? 0.95 : isFloating ? 0.85 : 0.8,
                      }}
                      transition={{
                        duration: isBursting
                          ? BURST_DURATION_MS / 1000
                          : isReforming
                          ? REFORM_DURATION_MS / 1000
                          : 0.3,
                        ease: isBursting ? 'easeOut' : isReforming ? 'easeIn' : 'easeInOut',
                      }}
                      style={{
                        transform: 'translate(-50%, -50%)',
                        width: `${node.dotSize || 5}px`,
                        height: `${node.dotSize || 5}px`,
                        borderRadius: '50%',
                        backgroundColor: node.color,
                        boxShadow: `0 0 10px ${node.color}80, 0 0 4px ${node.color}`,
                      }}
                    >
                      {/* Subtle independent pulse for texture during zooming (Section 3) */}
                      {isZooming && (
                        <motion.div
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            delay: node.pulseDelay || 0,
                            ease: 'easeInOut',
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: node.color,
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
