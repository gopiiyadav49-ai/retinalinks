'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

// ---------------------------------------------------------------------------
// 1. ROTATING WORD DATA
// ---------------------------------------------------------------------------
const WORDS = ['Website', 'App', 'Web App', 'Brand'] as const
const HOLD_MS = 2500
const TRANSITION_MS = 400

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length)
    }, HOLD_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="hero-rotating-word-container" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          className="hero-rotating-word font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{
            duration: TRANSITION_MS / 1000,
            ease: [0.2, 0, 0, 1],
          }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ---------------------------------------------------------------------------
// 2. THE MATH (Torus Knot Parametric Particle Generator with Light-Theme Gradient)
// ---------------------------------------------------------------------------
/**
 * Generates positions and chromatic gradient colors for a 3D Torus Knot particle cloud.
 *
 * Parametric Equations:
 * x = (R + r * cos(q * v)) * cos(p * u)
 * y = (R + r * cos(q * v)) * sin(p * u)
 * z = r * sin(q * v)
 *
 * Constants: R = 10, r = 3, p = 2, q = 3.
 */
// Helper function to create a soft, perfectly anti-aliased circular particle texture
function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.92)')
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 128, 128)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function generateTorusKnotParticles(count: number): {
  positions: Float32Array
  colors: Float32Array
} {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const R = 9.8
  const r = 3.2
  const p = 2
  const q = 3
  const noise = 0.22 // Silky soft, refined dispersion

  // Luxury high-contrast chromatic palette for vivid visibility on light theme
  const colorIndigo = new THREE.Color('#4338CA') // Deep Electric Indigo
  const colorCyan = new THREE.Color('#0284C7')   // Deep Azure Cyan
  const colorViolet = new THREE.Color('#7C3AED') // Royal Violet
  const colorCobalt = new THREE.Color('#1D4ED8') // Cobalt Blue
  const tempColor = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2
    const v = Math.random() * Math.PI * 2

    const radialScale = R + r * Math.cos(q * v)
    let x = radialScale * Math.cos(p * u)
    let y = radialScale * Math.sin(p * u)
    let z = r * Math.sin(q * v)

    // Controlled delicate stochastic noise
    x += (Math.random() - 0.5) * noise
    y += (Math.random() - 0.5) * noise
    z += (Math.random() - 0.5) * noise

    const i3 = i * 3
    positions[i3] = x
    positions[i3 + 1] = y
    positions[i3 + 2] = z

    // Smooth chromatic transition along the curve manifold
    const t = u / (Math.PI * 2)
    if (t < 0.33) {
      tempColor.lerpColors(colorIndigo, colorCyan, t * 3)
    } else if (t < 0.66) {
      tempColor.lerpColors(colorCyan, colorViolet, (t - 0.33) * 3)
    } else {
      tempColor.lerpColors(colorViolet, colorCobalt, (t - 0.66) * 3)
    }

    colors[i3] = tempColor.r
    colors[i3 + 1] = tempColor.g
    colors[i3 + 2] = tempColor.b
  }

  return { positions, colors }
}

// ---------------------------------------------------------------------------
// 3. THREE.JS 3D COMPONENT (<ParticleKnot />)
// ---------------------------------------------------------------------------
function ParticleKnot() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { positions, colors } = useMemo(() => generateTorusKnotParticles(18000), [])
  const circleTexture = useMemo(() => (typeof window !== 'undefined' ? createCircleTexture() : null), [])

  // Smooth mouse tilt parallax listener
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseRef.current = { x, y }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  // Silky harmonic continuous rotation & floating levitation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      // Continuous silky rotation on Y with gentle mouse parallax
      const targetRotY = t * 0.08 + mouseRef.current.x * 0.25
      const targetRotX = Math.sin(t * 0.22) * 0.16 + mouseRef.current.y * 0.2 + Math.PI / 10
      const targetRotZ = Math.cos(t * 0.18) * 0.12

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06)

      // Weightless floating levitation
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <Points
        positions={positions}
        colors={colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          map={circleTexture || undefined}
          vertexColors
          transparent
          alphaTest={0.001}
          size={0.17}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
          opacity={0.92}
        />
      </Points>
    </group>
  )
}

// ---------------------------------------------------------------------------
// 4. FORTUNE 500 TOP 20 ENTERPRISES (Vector Marks & Details)
// ---------------------------------------------------------------------------
interface Fortune500Item {
  id: string
  rank: string
  name: string
  renderLogo: () => React.ReactNode
}

const FORTUNE_500_LOGOS: Fortune500Item[] = [
  // 1. Walmart
  {
    id: 'f500-walmart',
    rank: '01',
    name: 'Walmart',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="12" y1="3" x2="12" y2="7.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="16.5" x2="12" y2="21" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="4.2" y1="7.5" x2="8.1" y2="9.75" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15.9" y1="14.25" x2="19.8" y2="16.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="4.2" y1="16.5" x2="8.1" y2="14.25" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15.9" y1="9.75" x2="19.8" y2="7.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  // 2. Amazon
  {
    id: 'f500-amazon',
    rank: '02',
    name: 'Amazon',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <text x="3" y="11" fontFamily="var(--font-sans)" fontSize="8.5" fontWeight="900" fill="#14141A" letterSpacing="-0.5">a</text>
        <path d="M4 14.5C8.5 17.5 15 17.5 19.5 14.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.5 13.5L20 14.5L18.5 16.5" fill="#F59E0B" />
      </svg>
    ),
  },
  // 3. Apple
  {
    id: 'f500-apple',
    rank: '03',
    name: 'Apple',
    renderLogo: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#14141A" aria-hidden="true">
        <path d="M15.5 3C15.5 4.5 14.2 6 12.5 6C12.5 4.5 14 3 15.5 3Z" />
        <path d="M17.8 8.5C16.8 9.2 16.2 10.3 16.2 11.6C16.2 13.2 17.2 14.4 18.2 15C17.4 17.2 15.8 20.5 13.8 20.5C12.9 20.5 12.3 20 11.2 20C10.1 20 9.4 20.5 8.6 20.5C6.6 20.5 4.5 16.5 4.5 12.8C4.5 9.5 6.6 7.8 8.6 7.8C9.6 7.8 10.5 8.5 11.2 8.5C11.9 8.5 12.8 7.8 13.9 7.8C14.7 7.8 16.6 8 17.8 8.5Z" />
      </svg>
    ),
  },
  // 4. UnitedHealth Group
  {
    id: 'f500-unitedhealth',
    rank: '04',
    name: 'UnitedHealth',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L4 5.5v6.2c0 5.4 3.4 10.5 8 12.3 4.6-1.8 8-6.9 8-12.3V5.5L12 2z" stroke="#3B82F6" />
        <path d="M12 8v8M8 12h8" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  // 5. Berkshire Hathaway
  {
    id: 'f500-berkshire',
    rank: '05',
    name: 'Berkshire Hathaway',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#14141A" strokeWidth="1.5" />
        <text x="6" y="16" fontFamily="serif" fontSize="11" fontWeight="700" fill="#14141A">BH</text>
      </svg>
    ),
  },
  // 6. CVS Health
  {
    id: 'f500-cvs',
    rank: '06',
    name: 'CVS Health',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#EF4444" fillOpacity="0.85" />
        <path d="M12 8v8M8 12h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  // 7. ExxonMobil
  {
    id: 'f500-exxon',
    rank: '07',
    name: 'ExxonMobil',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 5l7 14M10 5L3 19" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 5l7 14M21 5l-7 14" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  // 8. Alphabet (Google)
  {
    id: 'f500-alphabet',
    rank: '08',
    name: 'Alphabet',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21.35 12.04c0-.79-.07-1.54-.19-2.27H12v4.51h5.24c-.23 1.21-.91 2.24-1.93 2.93v2.44h3.13c1.83-1.69 2.91-4.17 2.91-7.61z" fill="#4285F4" />
        <path d="M12 21.5c2.61 0 4.8-.87 6.4-2.35l-3.13-2.44c-.87.58-1.98.92-3.27.92-2.51 0-4.64-1.7-5.4-3.98H3.35v2.52C4.95 19.38 8.23 21.5 12 21.5z" fill="#34A853" />
        <path d="M6.6 13.65c-.2-.58-.31-1.21-.31-1.85s.11-1.27.31-1.85V7.43H3.35C2.7 8.73 2.33 10.2 2.33 11.8s.37 3.07 1.02 4.37l3.25-2.52z" fill="#FBBC05" />
        <path d="M12 6.38c1.42 0 2.7.49 3.7 1.45l2.77-2.77C16.8 3.42 14.61 2.5 12 2.5 8.23 2.5 4.95 4.62 3.35 7.43l3.25 2.52c.76-2.28 2.89-3.98 5.4-3.98z" fill="#EA4335" />
      </svg>
    ),
  },
  // 9. McKesson
  {
    id: 'f500-mckesson',
    rank: '09',
    name: 'McKesson',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M4 19V5l8 7 8-7v14" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // 10. Cencora
  {
    id: 'f500-cencora',
    rank: '10',
    name: 'Cencora',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="#10B981" strokeWidth="2.2" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="3" fill="#10B981" />
      </svg>
    ),
  },
  // 11. Costco
  {
    id: 'f500-costco',
    rank: '11',
    name: 'Costco',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="8" width="20" height="8" rx="2" fill="#EF4444" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="7" cy="12" r="2" fill="#3B82F6" />
      </svg>
    ),
  },
  // 12. JPMorgan Chase
  {
    id: 'f500-jpmorgan',
    rank: '12',
    name: 'JPMorgan Chase',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#14141A" aria-hidden="true">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.2L17.5 8 12 11.4 6.5 8 12 5.2zM6 9.8l5 3.1v5.7l-5-3.1V9.8zm7 8.8v-5.7l5-3.1v5.7l-5 3.1z" />
      </svg>
    ),
  },
  // 13. Microsoft
  {
    id: 'f500-microsoft',
    rank: '13',
    name: 'Microsoft',
    renderLogo: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
        <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
        <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
      </svg>
    ),
  },
  // 14. Cardinal Health
  {
    id: 'f500-cardinal',
    rank: '14',
    name: 'Cardinal Health',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polygon points="12,2 22,12 12,22 2,12" fill="#DC2626" />
        <polygon points="12,6 18,12 12,18 6,12" fill="#FFFFFF" />
      </svg>
    ),
  },
  // 15. Chevron
  {
    id: 'f500-chevron',
    rank: '15',
    name: 'Chevron',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6l8 6 8-6" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12l8 6 8-6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // 16. The Home Depot
  {
    id: 'f500-homedepot',
    rank: '16',
    name: 'The Home Depot',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#EA580C" />
        <text x="4.5" y="15" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#FFFFFF">HD</text>
      </svg>
    ),
  },
  // 17. Ford Motor
  {
    id: 'f500-ford',
    rank: '17',
    name: 'Ford Motor',
    renderLogo: () => (
      <svg width="22" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
        <ellipse cx="13" cy="9" rx="12" ry="7" stroke="#2563EB" strokeWidth="2" fill="#1E3A8A" />
        <text x="6" y="12" fontFamily="cursive" fontSize="9" fontWeight="700" fill="#FFFFFF">Ford</text>
      </svg>
    ),
  },
  // 18. Marathon Petroleum
  {
    id: 'f500-marathon',
    rank: '18',
    name: 'Marathon Petroleum',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="2" />
        <path d="M7 16V8l5 6 5-6v8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  // 19. Kroger
  {
    id: 'f500-kroger',
    rank: '19',
    name: 'Kroger',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <text x="3" y="16" fontFamily="serif" fontSize="13" fontWeight="900" fill="#2563EB">K</text>
        <circle cx="17" cy="13" r="3" fill="#EF4444" />
      </svg>
    ),
  },
  // 20. Fannie Mae
  {
    id: 'f500-fanniemae',
    rank: '20',
    name: 'Fannie Mae',
    renderLogo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#059669" strokeWidth="2" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="#059669" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="#059669" />
      </svg>
    ),
  },
]

const F500_ROW_1 = FORTUNE_500_LOGOS.slice(0, 10)
const F500_ROW_2 = FORTUNE_500_LOGOS.slice(10, 20)

// ---------------------------------------------------------------------------
// 5. HERO SECTION COMPONENT (<HeroSection />)
// ---------------------------------------------------------------------------
export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const heroContainerRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)

  // Avoid SSR hydration issues with WebGL Canvas
  useEffect(() => {
    setMounted(true)
  }, [])

  // GSAP Entrance Choreography
  useEffect(() => {
    if (!mounted) return

    const targets = [
      badgeRef.current,
      headlineRef.current,
      subheadlineRef.current,
      ctaGroupRef.current,
    ].filter(Boolean)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.13,
          ease: 'power3.out',
          delay: 0.1,
        }
      )
    }, heroContainerRef)

    return () => ctx.revert()
  }, [mounted])

  return (
    <section
      ref={heroContainerRef}
      className="hero-section hero-section--light-3d"
      aria-label="Hero"
    >
      {/* 3D WebGL Particle Canvas (Fully Unobstructed at z-0, No Blur) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 22], fov: 52 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={1} />
            <ParticleKnot />
          </Canvas>
        )}
      </div>

      {/* ── Main Hero Content (Clean & Sharp Typography, No Blur Boxes) ── */}
      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-6 pb-12 select-none">
          {/* Floating Pill Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200/90 bg-white text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Next-Gen Creative Technology • Retinalinks
          </div>

          {/* Clean Light-Theme Headline with Rotating Word */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#14141A]"
          >
            We design and build your next <br />
            <RotatingWord />
          </h1>

          {/* Subtext */}
          <p
            ref={subheadlineRef}
            className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed"
          >
            A digital agency helping ambitious companies across the world launch products that look premium, load fast, and convert. From first sketch to shipped product.
          </p>

          {/* CTA Row */}
          <div
            ref={ctaGroupRef}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 bg-[#14141A] rounded-full hover:bg-black hover:shadow-[0_8px_25px_rgba(20,20,26,0.2)] active:scale-95"
            >
              Start Your Project
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <Link
              href="/services"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-neutral-900 transition-all duration-300 border border-neutral-300 bg-white rounded-full hover:border-neutral-400 hover:bg-neutral-50 hover:text-black shadow-sm active:scale-95"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </Container>

      {/* ── Fortune 500 Top 20 Client Marquee ─────────────────────── */}
      <div className="hero-marquee-wrapper relative z-10" aria-label="Trusted by teams worldwide — Fortune 500 Leaders">
        <Container>
          <div className="hero-f500-header">
            <div className="hero-f500-badge-row">
              <span className="hero-f500-badge">FORTUNE 500 PROVEN</span>
              <span className="hero-f500-count-chip">TOP 20 ENTERPRISES</span>
            </div>
            <h2 className="hero-f500-title">
              Trusted by Teams Worldwide — Powering Fortune 500 Leaders
            </h2>
            <p className="hero-f500-subtitle">
              Delivering high-velocity digital products, scalable web apps, and enterprise design systems for global market champions.
            </p>
          </div>
        </Container>

        {/* Dual-Stream Marquee Container */}
        <div className="hero-f500-marquee-container">
          {/* Stream 1: Logos 1 - 10 scrolling left */}
          <div className="hero-marquee-track-outer" aria-label="Fortune 500 Row 1">
            <motion.div
              className="hero-marquee-track"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 28,
                  ease: 'linear',
                },
              }}
            >
              {[...F500_ROW_1, ...F500_ROW_1].map((item, i) => (
                <div key={`${item.id}-r1-${i}`} className="hero-f500-card">
                  <span className="hero-f500-rank">#{item.rank}</span>
                  <div className="hero-f500-logo-glyph">{item.renderLogo()}</div>
                  <span className="hero-f500-company-name">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stream 2: Logos 11 - 20 scrolling right */}
          <div className="hero-marquee-track-outer" aria-label="Fortune 500 Row 2">
            <motion.div
              className="hero-marquee-track"
              animate={{ x: ['-50%', '0%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {[...F500_ROW_2, ...F500_ROW_2].map((item, i) => (
                <div key={`${item.id}-r2-${i}`} className="hero-f500-card">
                  <span className="hero-f500-rank">#{item.rank}</span>
                  <div className="hero-f500-logo-glyph">{item.renderLogo()}</div>
                  <span className="hero-f500-company-name">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
