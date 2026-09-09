'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// =============================================================================
// STEP 2: THE MATH (Torus Knot Parametric Particle Generator)
// =============================================================================
/**
 * Generates positions for a 3D Torus Knot particle cloud.
 *
 * Parametric Equations:
 * x = (R + r * cos(q * v)) * cos(p * u)
 * y = (R + r * cos(q * v)) * sin(p * u)
 * z = r * sin(q * v)
 *
 * @param count Number of particles to sample along the torus manifold (15,000)
 * @returns Float32Array containing interleaved [x, y, z] coordinates
 */
function generateTorusKnotParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3)

  // Torus Knot Parameters: (p=2, q=3) forms the classic trefoil-like infinity knot
  const R = 10
  const r = 3
  const p = 2
  const q = 3

  for (let i = 0; i < count; i++) {
    // Generate random angles across the manifold
    const u = Math.random() * Math.PI * 2
    const v = Math.random() * Math.PI * 2

    // Base parametric coordinates
    const radialScale = R + r * Math.cos(q * v)
    let x = radialScale * Math.cos(p * u)
    let y = radialScale * Math.sin(p * u)
    let z = r * Math.sin(q * v)

    // Add controlled stochastic noise (-0.2 to 0.2) to form a cosmic dust dispersion
    const noise = 0.4
    x += (Math.random() - 0.5) * noise
    y += (Math.random() - 0.5) * noise
    z += (Math.random() - 0.5) * noise

    const i3 = i * 3
    positions[i3] = x
    positions[i3 + 1] = y
    positions[i3 + 2] = z
  }

  return positions
}

// =============================================================================
// STEP 3: THE THREE.JS COMPONENT (<ParticleKnot />)
// =============================================================================
function ParticleKnot() {
  const pointsRef = useRef<THREE.Points>(null)

  // Memoize the 15,000 particles so calculation only executes once
  const particlePositions = useMemo(() => generateTorusKnotParticles(15000), [])

  // Continuous multi-axis rotation on every animation frame
  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.12
      pointsRef.current.rotation.y += delta * 0.18
      pointsRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points
        ref={pointsRef}
        positions={particlePositions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00ffcc"
          size={0.055}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.82}
        />
      </Points>
    </group>
  )
}

const emptySubscribe = () => () => {}

// =============================================================================
// STEP 5: HERO CONTENT COMPONENT (Typography & Layout)
// =============================================================================
export function AgencyHero() {
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false)
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // GSAP Entrance Choreography
  useEffect(() => {
    if (!mounted) return

    const targets = [
      badgeRef.current,
      headlineRef.current,
      subheadlineRef.current,
      ctaGroupRef.current,
      statsRef.current,
    ].filter(Boolean)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }, heroContainerRef)

    return () => ctx.revert()
  }, [mounted])

  return (
    <section
      ref={heroContainerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#08080C] text-white flex items-center justify-center"
      aria-label="Hero Section"
    >
      {/* 3D WebGL Particle Canvas (Fixed Background Layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 24], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.5} />
            <ParticleKnot />
          </Canvas>
        )}
      </div>

      {/* Atmospheric Vignette & Radial Glow Overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,12,0.4)_50%,rgba(8,8,12,0.95)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ffcc]/10 rounded-full blur-[140px] pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Modern High-End Digital Agency UI Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto select-none">
        {/* Floating Category Pill Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-[#00ffcc] text-xs font-semibold uppercase tracking-widest backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,255,204,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
          Next-Gen Creative Technology
        </div>

        {/* Cinematic Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 max-w-4xl"
        >
          Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] via-[#38bdf8] to-[#818cf8]">Impossible</span>
        </h1>

        {/* Descriptive Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed"
        >
          We architect immersive 3D digital experiences, high-performance web systems, and iconic visual identities designed to captivate and convert.
        </p>

        {/* Sleek Call to Action Buttons */}
        <div
          ref={ctaGroupRef}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-300 bg-[#00ffcc] rounded-full hover:bg-[#38ffdb] hover:shadow-[0_0_35px_rgba(0,255,204,0.5)] active:scale-95"
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
          </a>

          <a
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-neutral-200 transition-all duration-300 border border-neutral-700/80 bg-neutral-900/60 rounded-full hover:border-neutral-500 hover:bg-neutral-800/80 hover:text-white backdrop-blur-md active:scale-95"
          >
            Explore Services
          </a>
        </div>

        {/* Ambient Proof Strip */}
        <div
          ref={statsRef}
          className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6 sm:gap-12 max-w-xl text-left sm:text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">15K+</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">3D Particles</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">60 FPS</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">WebGL Engine</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#00ffcc] tracking-tight">100%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">Bespoke Code</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgencyHero
