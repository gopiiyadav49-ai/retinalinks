import { db, schema } from '@/lib/db'
import { asc } from 'drizzle-orm'
import type { Service, PortfolioItem, Testimonial, Faq } from '@/lib/db/schema'

/**
 * Fetch all services ordered by their `order` column.
 * Returns an empty array on error — callers fall back to seed data.
 */
export async function getServices(): Promise<Service[]> {
  const rows = await db
    .select()
    .from(schema.services)
    .orderBy(asc(schema.services.order))
  return rows
}

/**
 * Fetch all portfolio items ordered by their `order` column.
 * Returns an empty array on error — callers fall back to seed data.
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const rows = await db
    .select()
    .from(schema.portfolio)
    .orderBy(asc(schema.portfolio.order))
  return rows
}

/**
 * Fetch all testimonials ordered by their `order` column.
 * Returns an empty array on error — callers fall back to seed data.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db
    .select()
    .from(schema.testimonials)
    .orderBy(asc(schema.testimonials.order))
  return rows
}

/**
 * Fetch all FAQs ordered by their `order` column.
 * Returns an empty array on error — callers fall back to seed data.
 */
export async function getFaqs(): Promise<Faq[]> {
  const rows = await db
    .select()
    .from(schema.faqs)
    .orderBy(asc(schema.faqs.order))
  return rows
}
