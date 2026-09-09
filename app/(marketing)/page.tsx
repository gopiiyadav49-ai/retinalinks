import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection'

export const metadata: Metadata = {
  title: 'Retinalinks — Digital Agency',
  description:
    'A digital agency helping ambitious companies across the world launch products that look premium, load fast, and convert. From first sketch to shipped product.',
}

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
