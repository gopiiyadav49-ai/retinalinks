// Server Component — no 'use client'
import { getTestimonials } from '@/lib/db/queries'
import { TestimonialsCarousel, FALLBACK_TESTIMONIALS } from './TestimonialsCarousel'

export async function TestimonialsSection() {
  let items = FALLBACK_TESTIMONIALS
  try {
    const rows = await getTestimonials()
    if (rows.length > 0) items = rows
  } catch {
    // DB unreachable — fallback already set
  }

  return (
    <section className="tst-section" aria-labelledby="tst-heading">
      <div className="tst-inner">
        <header className="tst-header">
          <h2 id="tst-heading" className="tst-heading">
            What Clients Say
          </h2>
        </header>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  )
}
