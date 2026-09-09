/**
 * Seed script for the `portfolio` table.
 * Run once Supabase local dev is running:
 *
 *   npx tsx scripts/seed-portfolio.ts
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../lib/db/schema.js'
import type { NewPortfolioItem } from '../lib/db/schema.js'

const DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

const client = postgres(DATABASE_URL, { prepare: false })
const db = drizzle(client, { schema })

const PORTFOLIO_ITEMS: NewPortfolioItem[] = [
  {
    title: 'StaffEarn',
    description:
      'An AI-powered C2C IT recruitment platform built by Retinalinks that connects US IT recruiters with pre-vetted bench sales consultants across US and India timezones for faster candidate placement.',
    imageUrl: '/work-staffearn.png',
    tags: ['AI Platform', 'C2C Staffing', 'Web App'],
    order: 1,
  },
  {
    title: 'HealthTrack',
    description:
      'A patient-management web app rebuilt for speed and clarity — cutting appointment scheduling time by half and giving clinics a dashboard their staff actually enjoy using.',
    imageUrl: '/work-healthtrack.jpg',
    tags: ['Web App', 'Healthcare', 'Dashboard'],
    order: 2,
  },
  {
    title: 'StudioFlow',
    description:
      'A creative-studio booking platform designed to feel as polished as the studios it represents — real-time availability, seamless checkout, zero friction.',
    imageUrl: '/work-studioflow.jpg',
    tags: ['Web App', 'Booking', 'Design'],
    order: 3,
  },
  {
    title: 'Auxano',
    description:
      'A brand and website overhaul for a growth consultancy — positioning them as the premium option in a crowded market.',
    imageUrl: '/work-auxano.jpg',
    tags: ['Branding', 'Web Design'],
    order: 4,
  },
]

try {
  console.log('Seeding portfolio…')
  await db.insert(schema.portfolio).values(PORTFOLIO_ITEMS).onConflictDoNothing()
  console.log(`✓ Inserted ${PORTFOLIO_ITEMS.length} portfolio rows.`)
} catch (err) {
  console.error('Seed failed:', err)
  process.exit(1)
} finally {
  await client.end()
}
