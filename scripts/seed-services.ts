/**
 * Seed script for the `services` table.
 * Run once Supabase local dev is running:
 *
 *   npx tsx scripts/seed-services.ts
 *   -- or --
 *   node --loader ts-node/esm scripts/seed-services.ts
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../lib/db/schema.js'
import type { NewService } from '../lib/db/schema.js'

const DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

const client = postgres(DATABASE_URL, { prepare: false })
const db = drizzle(client, { schema })

const SERVICES: NewService[] = [
  {
    title: 'Web Design',
    description:
      'Beautiful, fast, conversion-focused websites built to make the right first impression — anywhere in the world.',
    icon: 'layout',
    features: [
      'Custom UI/UX, not templates',
      'Mobile-first, sub-2-second load times',
      'Built for SEO from day one',
    ],
    order: 1,
  },
  {
    title: 'App Development',
    description:
      'Native and cross-platform apps engineered for performance, built to scale with your user base.',
    icon: 'smartphone',
    features: [
      'iOS, Android & cross-platform',
      'Scalable backend architecture',
      'Post-launch support included',
    ],
    order: 2,
  },
  {
    title: 'Web App Development',
    description:
      'Full-stack web applications — dashboards, portals, SaaS products — built on modern, maintainable architecture.',
    icon: 'monitor',
    features: [
      'Custom dashboards & internal tools',
      'Secure authentication & data handling',
      'API-first, integration-ready',
    ],
    order: 3,
  },
  {
    title: 'Branding',
    description:
      'Logo, identity, and visual language that makes your company instantly recognizable and memorable.',
    icon: 'palette',
    features: [
      'Logo & visual identity systems',
      'Brand guidelines & style guides',
      'Marketing collateral & templates',
    ],
    order: 4,
  },
]

try {
  console.log('Seeding services…')
  await db.insert(schema.services).values(SERVICES).onConflictDoNothing()
  console.log(`✓ Inserted ${SERVICES.length} service rows.`)
} catch (err) {
  console.error('Seed failed:', err)
  process.exit(1)
} finally {
  await client.end()
}
