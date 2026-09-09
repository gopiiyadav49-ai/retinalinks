import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { WorkPageContent } from '@/components/sections/WorkPageContent'

export const metadata: Metadata = createMetadata({
  title: 'Selected Work & Case Studies — Retinalinks Website Development Company',
  description: 'Explore verified case studies and digital products engineered by Retinalinks, including StaffEarn, HealthTrack, StudioFlow, and Auxano. 40+ projects shipped globally.',
  path: '/work',
  keywords: [
    'Retinalinks Portfolio',
    'website development case studies',
    'digital agency projects',
    'StaffEarn case study',
    'Next.js web applications',
    'best web agency work',
  ],
})

export default function WorkPage() {
  return (
    <main>
      <WorkPageContent />
    </main>
  )
}
