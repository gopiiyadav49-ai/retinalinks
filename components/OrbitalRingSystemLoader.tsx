'use client'

import dynamic from 'next/dynamic'

const OrbitalRingSystem = dynamic(() => import('@/components/OrbitalRingSystem'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%' }} />,
})

export default OrbitalRingSystem
