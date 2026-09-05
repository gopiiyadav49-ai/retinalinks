'use client'

import dynamic from 'next/dynamic'

const Persistent3DBackground = dynamic(
  () => import('@/components/Persistent3DBackground'),
  { ssr: false }
)

export default Persistent3DBackground
