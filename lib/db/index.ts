import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// ─── Lazy DB singleton ────────────────────────────────────────────────────────
// We initialise the connection pool on FIRST USE rather than at module load.
// This prevents the build worker (which imports this file but never queries the DB)
// from opening a TCP socket and crashing with 0xC0000409 on Windows / Turbopack.

let _db: ReturnType<typeof drizzle> | null = null

function getDb() {
  if (!_db) {
    const connectionString =
      process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

    // Disable prefetch — not supported in Supabase Transaction pool mode
    const client = postgres(connectionString, {
      prepare: false,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    })

    _db = drizzle(client, { schema })
  }
  return _db
}

// Provide the same ergonomic `db` and `schema` exports callers already use.
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
export { schema }
