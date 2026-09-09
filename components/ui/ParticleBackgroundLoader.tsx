'use client'

import dynamic from 'next/dynamic'

// This client wrapper is the only valid place to use ssr:false with next/dynamic
const GlobalAmbientBackground = dynamic(
  () => import('@/components/ui/GlobalAmbientBackground').then((m) => m.GlobalAmbientBackground),
  { ssr: false }
)

export function ParticleBackgroundLoader() {
  return <GlobalAmbientBackground />
}
