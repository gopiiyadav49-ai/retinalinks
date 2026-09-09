/**
 * Seed script for the `faqs` table.
 * Run once Supabase local dev is running:
 *
 *   npx tsx scripts/seed-faqs.ts
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../lib/db/schema.js'
import type { NewFaq } from '../lib/db/schema.js'

const DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

const client = postgres(DATABASE_URL, { prepare: false })
const db = drizzle(client, { schema })

const FAQS: NewFaq[] = [
  {
    question: 'What services does Retinalinks offer?',
    answer:
      'We design and build websites, mobile apps, web applications, and brand identities for companies of all sizes, worldwide.',
    order: 1,
  },
  {
    question: 'Do you work with clients outside India?',
    answer:
      'Yes — Retinalinks works with clients globally, across time zones, with async-friendly communication.',
    order: 2,
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects launch within 4-8 weeks depending on scope, from first call to live product.',
    order: 3,
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes, every project includes a post-launch support window, with maintenance plans available beyond that.',
    order: 4,
  },
  {
    question: "What's your development process?",
    answer:
      'Discovery → Design → Development → Testing → Launch — with regular check-ins at every stage so there are no surprises.',
    order: 5,
  },
  {
    question: 'How do I get started?',
    answer:
      "Reach out through our contact form — we'll respond within 48 hours with next steps and a proposal.",
    order: 6,
  },
]

try {
  console.log('Seeding FAQs…')
  await db.insert(schema.faqs).values(FAQS).onConflictDoNothing()
  console.log(`✓ Inserted ${FAQS.length} FAQ rows.`)
} catch (err) {
  console.error('Seed failed:', err)
  process.exit(1)
} finally {
  await client.end()
}
