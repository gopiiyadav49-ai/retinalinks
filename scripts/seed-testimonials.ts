// TODO: replace with real client testimonials before this section goes live — do not publish placeholder names/quotes as real.

/**
 * Seed script for the `testimonials` table.
 * Run once Supabase local dev is running:
 *
 *   npx tsx scripts/seed-testimonials.ts
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../lib/db/schema.js'
import type { NewTestimonial } from '../lib/db/schema.js'

const DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

const client = postgres(DATABASE_URL, { prepare: false })
const db = drizzle(client, { schema })

const TESTIMONIALS: NewTestimonial[] = [
  {
    quote:
      'Retinalinks took our idea and shipped something better than what we pitched them. Fast, communicative, no surprises.',
    name: 'Placeholder Client',
    role: 'Founder',
    company: 'Placeholder Co.',
    photoUrl: null,
    order: 1,
  },
  {
    quote:
      "The best part wasn't even the design — it was how easy they were to work with across time zones.",
    name: 'Placeholder Client',
    role: 'Product Lead',
    company: 'Placeholder Co.',
    photoUrl: null,
    order: 2,
  },
]

try {
  console.log('Seeding testimonials…')
  await db.insert(schema.testimonials).values(TESTIMONIALS).onConflictDoNothing()
  console.log(`✓ Inserted ${TESTIMONIALS.length} testimonial rows.`)
} catch (err) {
  console.error('Seed failed:', err)
  process.exit(1)
} finally {
  await client.end()
}
