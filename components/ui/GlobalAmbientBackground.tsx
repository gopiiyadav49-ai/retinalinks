'use client'

import React, { useEffect, useRef } from 'react'

interface GravityParticle {
  x: number
  y: number
  vx: number
  vy: number
  baseVy: number
  radius: number
  colorIdx: number
  alpha: number
  pulsePhase: number
  pulseSpeed: number
}

// 4-point luxury palette matching hero section aesthetics
const PALETTE = [
  { r: 67, g: 56, b: 202 },   // Deep Electric Indigo (#4338CA)
  { r: 2, g: 132, b: 199 },   // Deep Azure Cyan (#0284C7)
  { r: 124, g: 58, b: 237 },  // Royal Violet (#7C3AED)
  { r: 29, g: 78, b: 216 },   // Cobalt Blue (#1D4ED8)
]

export function GlobalAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Pre-render soft circular particle stamps for maximum GPU/CPU performance
    const spriteSize = 28
    const sprites: HTMLCanvasElement[] = PALETTE.map((color) => {
      const offscreen = document.createElement('canvas')
      offscreen.width = spriteSize * dpr
      offscreen.height = spriteSize * dpr
      const offCtx = offscreen.getContext('2d')
      if (offCtx) {
        offCtx.scale(dpr, dpr)
        const center = spriteSize / 2
        const grad = offCtx.createRadialGradient(center, center, 0, center, center, center)
        grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.95)`)
        grad.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`)
        grad.addColorStop(0.8, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`)
        grad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        offCtx.fillStyle = grad
        offCtx.fillRect(0, 0, spriteSize, spriteSize)
      }
      return offscreen
    })

    // Particle count: 85 on desktop, 45 on mobile for 60 FPS performance
    const isMobile = width < 768
    const PARTICLE_COUNT = isMobile ? 45 : 85
    const CONNECT_DISTANCE = isMobile ? 95 : 130
    const CONNECT_DIST_SQ = CONNECT_DISTANCE * CONNECT_DISTANCE

    const particles: GravityParticle[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 1.8 + Math.random() * 2.8
      // Subtle downward gravity velocity; larger particles drift slightly faster (depth parallax)
      const baseVy = 0.25 + (radius / 4.6) * 0.45 + Math.random() * 0.25
      const colorIdx = i % PALETTE.length

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: baseVy,
        baseVy,
        radius,
        colorIdx,
        alpha: 0.3 + Math.random() * 0.45,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      })
    }

    // Mouse interactive deflection position
    let mouseX = -1000
    let mouseY = -1000
    let mouseActive = false
    let mouseTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mouseActive = true
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        mouseActive = false
      }, 2000)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize handling
    const handleResize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    // Scroll tracking for subtle fluid inertia
    let lastScrollY = window.scrollY
    let scrollVelocity = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollVelocity = (currentScrollY - lastScrollY) * 0.08
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Pause when tab is inactive to preserve CPU/battery
    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let frame = 0

    // Animation loop: gravity flow + mesh connecting lines
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      frame++
      ctx.clearRect(0, 0, width, height)

      // Decay scroll inertia gradually
      scrollVelocity *= 0.92

      // 1. Draw connecting mesh lines between nearby particles (particles.js effect)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p2 = particles[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distSq = dx * dx + dy * dy

          if (distSq < CONNECT_DIST_SQ) {
            const dist = Math.sqrt(distSq)
            const alphaFactor = 1 - dist / CONNECT_DISTANCE
            // Subtle indigo/cyan translucent line
            ctx.strokeStyle = `rgba(99, 102, 241, ${alphaFactor * 0.18})`
            ctx.lineWidth = 0.85
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // 2. Update and render particles with gravity physics
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i]

        // Gravity downward motion + horizontal organic sine wave sway
        p.y += p.vy + scrollVelocity
        p.x += p.vx + Math.sin(frame * 0.012 + p.pulsePhase) * 0.2

        // Interactive mouse deflection
        if (mouseActive) {
          const mdx = p.x - mouseX
          const mdy = p.y - mouseY
          const mDistSq = mdx * mdx + mdy * mdy
          const repelRadius = 110
          if (mDistSq < repelRadius * repelRadius && mDistSq > 0) {
            const mDist = Math.sqrt(mDistSq)
            const force = (1 - mDist / repelRadius) * 2.2
            p.x += (mdx / mDist) * force
            p.y += (mdy / mDist) * force
          }
        }

        // Screen wrap: loop particles seamlessly when falling off bottom or sides
        if (p.y > height + 25) {
          p.y = -15
          p.x = Math.random() * width
        } else if (p.y < -25) {
          p.y = height + 15
          p.x = Math.random() * width
        }

        if (p.x > width + 25) {
          p.x = -15
        } else if (p.x < -25) {
          p.x = width + 15
        }

        // Breathing pulse alpha
        p.pulsePhase += p.pulseSpeed
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.12
        const renderSize = p.radius * 3.8

        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, currentAlpha))
        const sprite = sprites[p.colorIdx]
        ctx.drawImage(
          sprite,
          p.x - renderSize / 2,
          p.y - renderSize / 2,
          renderSize,
          renderSize
        )
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(mouseTimeout)
    }
  }, [])

  return (
    <div
      className="global-ambient-particles-wrap fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
