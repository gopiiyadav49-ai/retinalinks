'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── PALETTE DEFINITION ───────────────────────────────────────────────────────
// Warm pastel claymorphism palette matching Retinalinks design tokens:
// Cream (#FAF6F0), Peach (#F5C6A5), Pink (#F0B8C4), Lavender (#C3BFF0), Mint (#A9DCD9)
const PALETTE = [
  new THREE.Color('#F5C6A5'), // Peach
  new THREE.Color('#C3BFF0'), // Lavender
  new THREE.Color('#A9DCD9'), // Mint
  new THREE.Color('#F0B8C4'), // Pink
  new THREE.Color('#F5DDA0'), // Butter / Cream
]

// Deterministic pseudo-random sequence for pure, reproducible initial positions
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9973.13 + 127.1) * 43758.5453
  return x - Math.floor(x)
}

const PARTICLE_COUNT = 100

// Pre-computed static buffer arrays (pure, evaluated once at module level)
const INITIAL_POSITIONS = new Float32Array(PARTICLE_COUNT * 3)
const INITIAL_COLORS = new Float32Array(PARTICLE_COUNT * 3)

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const x = (pseudoRandom(i * 3 + 1) - 0.5) * 24
  const y = (pseudoRandom(i * 3 + 2) - 0.5) * 20
  const z = (pseudoRandom(i * 3 + 3) - 0.5) * 14 - 2

  INITIAL_POSITIONS[i * 3] = x
  INITIAL_POSITIONS[i * 3 + 1] = y
  INITIAL_POSITIONS[i * 3 + 2] = z

  const color = PALETTE[i % PALETTE.length]
  INITIAL_COLORS[i * 3] = color.r
  INITIAL_COLORS[i * 3 + 1] = color.g
  INITIAL_COLORS[i * 3 + 2] = color.b
}

// Generate circular soft glow sprite texture in memory
function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

interface SceneProps {
  scrollProgress: React.MutableRefObject<number>
}

// ── FLOATING 3D ENVIRONMENT (Render Loop Decoupled via useFrame Lerp) ────────
function EvolvingScene({ scrollProgress }: SceneProps) {
  const rootGroupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const meshGroupRef = useRef<THREE.Group>(null)
  const smoothedProgress = useRef(0)

  // Pre-allocated typed arrays cloned once per scene instance
  const { positions, colors } = useMemo(() => {
    return {
      positions: new Float32Array(INITIAL_POSITIONS),
      colors: new Float32Array(INITIAL_COLORS),
    }
  }, [])

  const texture = useMemo(() => createCircleTexture(), [])

  useFrame((state) => {
    // 1. Smooth lerp decoupling render loop from scroll events
    const target = scrollProgress.current
    smoothedProgress.current += (target - smoothedProgress.current) * 0.1
    const p = smoothedProgress.current
    const time = state.clock.getElapsedTime()

    // 2. Camera perspective drift via scene root (smoothly lerped)
    if (rootGroupRef.current) {
      rootGroupRef.current.position.x = -1.2 * p + Math.sin(time * 0.18) * 0.25
      rootGroupRef.current.position.y = 3.5 * p + Math.cos(time * 0.15) * 0.2
      rootGroupRef.current.position.z = 1.2 * p
      rootGroupRef.current.rotation.z = -0.15 * p + Math.sin(time * 0.1) * 0.02
    }

    // 3. Particle field motion (hardware accelerated 3D transform, no CPU buffer re-uploads)
    if (pointsRef.current) {
      pointsRef.current.position.y = -2.5 * p
      pointsRef.current.rotation.y = time * 0.05 + p * 0.6
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05 + p * 0.2

      // Contextual opacity: subtle in Hero (0.35) -> richer in Services/Work/Contact (0.75)
      const mat = pointsRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.35 + (0.75 - 0.35) * Math.min(1, p * 1.8)
    }

    // 4. Abstract geometric ribbon wireframe torus (smoothly lerped)
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.x = time * 0.06 + p * 0.8
      meshGroupRef.current.rotation.y = time * 0.08 + p * 1.2
      meshGroupRef.current.position.y = -3.2 * p
    }
  })

  return (
    <group ref={rootGroupRef}>
      {/* Soft Ambient & Directional Lights matching palette */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 8, 5]} intensity={0.6} color="#F5C6A5" />
      <directionalLight position={[-4, -6, -3]} intensity={0.5} color="#C3BFF0" />

      {/* Point Particle Field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.45}
          map={texture}
          transparent
          vertexColors
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </points>

      {/* Evolving Abstract Form: Delicate dual floating torus rings */}
      <group ref={meshGroupRef}>
        <mesh position={[2, 0, -2]}>
          <torusGeometry args={[3.2, 0.04, 16, 64]} />
          <meshBasicMaterial
            color="#C3BFF0"
            transparent
            opacity={0.22}
            wireframe
          />
        </mesh>
        <mesh position={[-2, -1, -3]} rotation={[1.2, 0.4, 0]}>
          <torusGeometry args={[2.5, 0.035, 16, 64]} />
          <meshBasicMaterial
            color="#A9DCD9"
            transparent
            opacity={0.18}
            wireframe
          />
        </mesh>
      </group>
    </group>
  )
}

// ── ROOT PERSISTENT 3D BACKGROUND CONTAINER ──────────────────────────────────
export default function Persistent3DBackground() {
  // 1. Scroll progress stored strictly in a ref — never React state
  const scrollProgress = useRef(0)
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false))

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', checkMobile)

    // GSAP ScrollTrigger updating ref directly on scroll
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    return () => {
      window.removeEventListener('resize', checkMobile)
      st.kill()
    }
  }, [])

  // On mobile (< 768px): disable the Three.js layer to preserve 60fps & battery
  if (isMobile) return null

  return (
    <div
      id="persistent-3d-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <EvolvingScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
