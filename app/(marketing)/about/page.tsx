import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { AboutPageContent } from '@/components/sections/AboutPageContent'

export const metadata: Metadata = createMetadata({
  title: 'About Retinalinks — Digital Agency & Elite Website Development Company',
  description: 'Learn about Retinalinks, our engineering philosophy, founding milestones, and global team crafting high-performance websites and custom web applications.',
  path: '/about',
  keywords: [
    'About Retinalinks',
    'Retinalinks Digital Agency',
    'website development company team',
    'digital agency history',
    'Next.js development studio',
    'digital product agency',
  ],
})

export default function AboutPage() {
  return (
    <main>
      <AboutPageContent />
    </main>
  )
}
