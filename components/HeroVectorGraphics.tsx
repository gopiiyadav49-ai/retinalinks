'use client'

import { useEffect, useRef } from 'react'

// ─── HeroVectorGraphics — RIGHT-ANCHORED 3D DATA GLOBE & EXPANDING CIRCLE WORDS
// Specs:
//   • Placed in the RIGHT column of the hero split layout
//   • Fully responsive from large desktop (580px) down to mobile phones (320px)
//   • Concentric 3D orbital rings revolving on tilted axes around the 3D globe
//   • 8 expanding circular words orbiting around the perimeter with dynamic scaling:
//     'Website Development', 'App Development', 'SEO', 'Logo Design',
//     'Poster Design', 'UI/UX Design', 'Web Apps', 'Branding'
//   • Radial laser tethers, traveling pulse particles, and glassmorphic status pills

interface Point3D {
  x: number
  y: number
  z: number
  baseX: number
  baseY: number
  baseZ: number
  label?: string
  isBeacon?: boolean
}

const EXPANDING_KEYWORDS = [
  'Website Development',
  'App Development',
  'SEO',
  'Logo Design',
  'Poster Design',
  'UI/UX Design',
  'Web Apps',
  'Branding',
]

const PILL_COLORS = [
  { border: 'rgba(14, 165, 233, 0.70)', dot: '#0EA5E9', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(129, 140, 248, 0.70)', dot: '#6366F1', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(244, 63, 94, 0.70)', dot: '#F43F5E', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(245, 158, 11, 0.70)', dot: '#F59E0B', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(16, 185, 129, 0.70)', dot: '#10B981', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(168, 85, 247, 0.70)', dot: '#A855F7', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(6, 182, 212, 0.70)', dot: '#06B6D4', bg: 'rgba(255, 255, 255, 0.92)' },
  { border: 'rgba(236, 72, 153, 0.70)', dot: '#EC4899', bg: 'rgba(255, 255, 255, 0.92)' },
]

export default function HeroVectorGraphics() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // ── Generate 3D Sphere Points (Fibonacci distribution) ───────────────────
    const NUM_POINTS = 200
    const points: Point3D[] = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const binaryLabels = ['011', '101', '010', '110', 'SYNC', 'NODE', '78%', 'NET']

    for (let i = 0; i < NUM_POINTS; i++) {
      const y = 1 - (i / (NUM_POINTS - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      const isBeacon = i % 14 === 0
      const label = isBeacon ? binaryLabels[(i / 14) % binaryLabels.length] : undefined

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        label,
        isBeacon,
      })
    }

    let angleY = 0
    let angleX = 0.22
    let ringPhases = [0, 0, 0, 0, 0]
    let wordOrbitAngle = 0
    let waveTime = 0

    // Helper: Draw rounded pill rectangle
    function drawPill(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fill: string,
      stroke: string
    ) {
      c.beginPath()
      c.moveTo(x + r, y)
      c.lineTo(x + w - r, y)
      c.quadraticCurveTo(x + w, y, x + w, y + r)
      c.lineTo(x + w, y + h - r)
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      c.lineTo(x + r, y + h)
      c.quadraticCurveTo(x, y + h, x, y + h - r)
      c.lineTo(x, y + r)
      c.quadraticCurveTo(x, y, x + r, y)
      c.closePath()
      c.fillStyle = fill
      c.fill()
      c.strokeStyle = stroke
      c.lineWidth = 1.1
      c.stroke()
    }

    // ── Main 60FPS Render Loop ──────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Dynamic scales proportional to container dimensions
      const side = Math.min(width, height)
      const isMobile = side < 480
      const globeRadius = isMobile ? side * 0.19 : side * 0.22
      const maxReachRadius = isMobile ? side * 0.43 : side * 0.45
      const fov = isMobile ? 420 : 480

      angleY += 0.003
      wordOrbitAngle += 0.0018
      waveTime += 0.012

      // ── 1. Expanding Concentric Ripple Wave Rings ──────────────────────────
      for (let w = 0; w < 3; w++) {
        const progress = ((waveTime + w * 0.33) % 1)
        const waveRadius = globeRadius + progress * (maxReachRadius - globeRadius + 15)
        const waveAlpha = Math.sin(progress * Math.PI) * 0.38

        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, waveRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(14, 165, 233, ${waveAlpha})`
        ctx.lineWidth = 1
        ctx.setLineDash([8, 10])
        ctx.stroke()
        ctx.restore()
      }

      // ── 2. Scaled 3D Multi-Rings ───────────────────────────────────────────
      const RINGS = [
        { radius: globeRadius * 1.25, tiltX: 0.35, tiltZ: -0.20, speed: -0.007, dash: [20, 10], stroke: 'rgba(14, 165, 233, 0.65)', width: 1.6, beacon: true, beaconColor: '#06B6D4' },
        { radius: globeRadius * 1.45, tiltX: 0.95, tiltZ: 0.45, speed: 0.008, dash: [14, 8], stroke: 'rgba(99, 102, 241, 0.60)', width: 1.5, beacon: true, beaconColor: '#818CF8' },
        { radius: globeRadius * 1.62, tiltX: -0.75, tiltZ: -0.50, speed: -0.006, dash: [24, 12], stroke: 'rgba(244, 114, 182, 0.55)', width: 1.4, beacon: true, beaconColor: '#F43F5E' },
        { radius: globeRadius * 1.78, tiltX: 1.25, tiltZ: -0.15, speed: 0.005, dash: [10, 8], stroke: 'rgba(20, 184, 166, 0.55)', width: 1.3 },
        { radius: maxReachRadius, tiltX: 0.22, tiltZ: -0.10, speed: 0.002, dash: [4, 14], stroke: 'rgba(79, 70, 229, 0.40)', width: 1.1, hasTicks: true },
      ]

      RINGS.forEach((ring, rIdx) => {
        ringPhases[rIdx] += ring.speed

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(ring.tiltZ)
        ctx.scale(1, Math.cos(ring.tiltX))
        ctx.rotate(ringPhases[rIdx])

        ctx.beginPath()
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = ring.stroke
        ctx.lineWidth = ring.width
        ctx.setLineDash(ring.dash)
        ctx.stroke()

        // Radial ticks around outer ring
        if (ring.hasTicks) {
          const numTicks = 64
          ctx.setLineDash([])
          for (let t = 0; t < numTicks; t++) {
            const rad = (t / numTicks) * Math.PI * 2
            const isMajor = t % 8 === 0
            const len = isMajor ? 7 : 4
            const r1 = ring.radius - len
            const r2 = ring.radius
            ctx.beginPath()
            ctx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1)
            ctx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2)
            ctx.strokeStyle = isMajor ? 'rgba(79, 70, 229, 0.60)' : 'rgba(99, 102, 241, 0.28)'
            ctx.lineWidth = isMajor ? 1.4 : 0.8
            ctx.stroke()
          }
        }

        // Orbiting beacon dots
        if (ring.beacon && ring.beaconColor) {
          const bAngle = ringPhases[rIdx] * 2.8
          const bx = Math.cos(bAngle) * ring.radius
          const by = Math.sin(bAngle) * ring.radius

          ctx.beginPath()
          ctx.arc(bx, by, isMobile ? 5 : 7, 0, Math.PI * 2)
          ctx.fillStyle = ring.beaconColor + '33'
          ctx.fill()

          ctx.beginPath()
          ctx.arc(bx, by, isMobile ? 2.5 : 3.5, 0, Math.PI * 2)
          ctx.fillStyle = ring.beaconColor
          ctx.fill()
        }

        ctx.restore()
      })

      // ── 3. Rotate & Project 3D Sphere Points ───────────────────────────────
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      const projected = points.map((p) => {
        const bx = p.baseX * globeRadius
        const by = p.baseY * globeRadius
        const bz = p.baseZ * globeRadius

        const x1 = bx * cosY - bz * sinY
        const z1 = bz * cosY + bx * sinY
        const y1 = by * cosX - z1 * sinX
        const z2 = z1 * cosX + by * sinX

        const scale = fov / (fov + z2)
        const px = cx + x1 * scale
        const py = cy + y1 * scale

        return {
          px,
          py,
          scale,
          z: z2,
          isBeacon: p.isBeacon,
          label: p.label,
        }
      })

      projected.sort((a, b) => a.z - b.z)

      // ── 4. Dynamic Network Interconnect Lines ─────────────────────────────
      ctx.lineWidth = 0.8
      const maxConnectDist = globeRadius * 0.26
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i]
        if (p1.z < -globeRadius * 0.3) continue

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j]
          if (p2.z < -globeRadius * 0.3) continue

          const dx = p1.px - p2.px
          const dy = p1.py - p2.py
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.42 * Math.min(p1.scale, p2.scale)
            ctx.beginPath()
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`
            ctx.stroke()
          }
        }
      }

      // ── 5. Draw Sphere Points & Binary Data Packets ────────────────────────
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        const depthNorm = (p.z + globeRadius) / (globeRadius * 2)
        const alpha = 0.18 + depthNorm * 0.72
        const pointSize = Math.max(1, (p.isBeacon ? 3.2 : 1.6) * p.scale)

        if (p.isBeacon) {
          ctx.beginPath()
          ctx.arc(p.px, p.py, pointSize * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha * 0.25})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(p.px, p.py, pointSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
          ctx.fill()

          if (p.label && depthNorm > 0.45 && !isMobile) {
            ctx.font = '7px monospace'
            ctx.fillStyle = `rgba(45, 27, 105, ${alpha * 0.82})`
            ctx.fillText(p.label, p.px + 6, p.py - 3)
          }
        } else {
          ctx.beginPath()
          ctx.arc(p.px, p.py, pointSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(99, 102, 241, ${alpha * 0.65})`
          ctx.fill()
        }
      }

      // ── 6. Central Soft Glow Aura ──────────────────────────────────────────
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, globeRadius * 0.85)
      coreGrad.addColorStop(0, 'rgba(6, 182, 212, 0.12)')
      coreGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.05)')
      coreGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(cx, cy, globeRadius * 0.85, 0, Math.PI * 2)
      ctx.fill()

      // ── 7. EXPANDING CIRCULAR WORDS ORBITING IN THE RIGHT CIRCLE ───────────
      const wordOrbitRadius = isMobile
        ? side * 0.33 + Math.sin(waveTime * 1.5) * 6
        : side * 0.38 + Math.sin(waveTime * 1.5) * 12

      // Orbit guide ring
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, wordOrbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.22)'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 7])
      ctx.stroke()
      ctx.restore()

      const numWords = EXPANDING_KEYWORDS.length
      ctx.font = isMobile ? '600 9px system-ui, -apple-system, sans-serif' : '600 11px system-ui, -apple-system, sans-serif'
      ctx.textBaseline = 'middle'

      for (let i = 0; i < numWords; i++) {
        const word = EXPANDING_KEYWORDS[i]
        const col = PILL_COLORS[i % PILL_COLORS.length]

        const ang = (i / numWords) * Math.PI * 2 + wordOrbitAngle

        const wx = cx + Math.cos(ang) * wordOrbitRadius
        const wy = cy + Math.sin(ang) * wordOrbitRadius

        // 1. Radial Tether Line
        const tetherStartX = cx + Math.cos(ang) * (globeRadius + 8)
        const tetherStartY = cy + Math.sin(ang) * (globeRadius + 8)
        ctx.beginPath()
        ctx.moveTo(tetherStartX, tetherStartY)
        ctx.lineTo(wx, wy)
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.18)'
        ctx.lineWidth = 0.8
        ctx.setLineDash([2, 4])
        ctx.stroke()
        ctx.setLineDash([])

        // 2. Pulse particle
        const tetherPulse = ((waveTime * 2 + i * 0.25) % 1)
        const tpx = tetherStartX + (wx - tetherStartX) * tetherPulse
        const tpy = tetherStartY + (wy - tetherStartY) * tetherPulse
        ctx.beginPath()
        ctx.arc(tpx, tpy, isMobile ? 1.6 : 2, 0, Math.PI * 2)
        ctx.fillStyle = col.dot
        ctx.fill()

        // 3. Word Pill Box
        const textMetrics = ctx.measureText(word)
        const padX = isMobile ? 6 : 9
        const padY = isMobile ? 3 : 5
        const pillW = textMetrics.width + padX * 2 + (isMobile ? 12 : 14)
        const pillH = isMobile ? 21 : 26
        const pillX = wx - pillW / 2
        const pillY = wy - pillH / 2

        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)'
        ctx.shadowBlur = isMobile ? 5 : 8
        ctx.shadowOffsetY = 2

        drawPill(ctx, pillX, pillY, pillW, pillH, pillH / 2, col.bg, col.border)

        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Status Dot inside pill
        const dotX = pillX + padX + (isMobile ? 2 : 2.5)
        const dotY = pillY + pillH / 2
        const dotRadius = isMobile ? 2.2 : 2.8

        ctx.beginPath()
        ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = col.dot
        ctx.fill()

        // Text
        ctx.fillStyle = '#1E1B4B'
        ctx.fillText(word, dotX + (isMobile ? 6 : 7.5), dotY)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '580px',
        aspectRatio: '1 / 1',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
