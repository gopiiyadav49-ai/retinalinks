import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { AboutPageContent } from '@/components/sections/AboutPageContent'

export const metadata: Metadata = createMetadata({
  title: 'About — Retinalinks Digital Agency',
  description: 'A premium digital engineering studio building world-class digital products. Learn about our team, mission, values, and the milestones that shaped Retinalinks.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <main>
      <AboutPageContent />
    </main>
  )
}
