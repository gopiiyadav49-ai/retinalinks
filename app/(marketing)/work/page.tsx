import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { WorkPageContent } from '@/components/sections/WorkPageContent'

export const metadata: Metadata = createMetadata({
  title: 'Selected Work — Retinalinks Digital Agency',
  description: 'A curated showcase of digital products, platforms, and brand systems engineered by Retinalinks. 40+ projects shipped across web, mobile, and brand.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <main>
      <WorkPageContent />
    </main>
  )
}
