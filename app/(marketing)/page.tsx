import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection'

import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Retinalinks — Premier Digital Agency & Website Development Company',
  description:
    'Retinalinks is a premier digital agency and leading website development company. We engineer custom Next.js web applications, enterprise websites, and conversion-focused UI/UX design systems for visionary brands worldwide.',
  path: '/',
})

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <FeaturedWorkSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ClosingCtaSection />
    </main>
  )
}
