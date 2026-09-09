'use client'

import { AnimatedCounter } from '@/components/AnimatedCounter'

// ---------------------------------------------------------------------------
// Stat data — exactly as specified
// ---------------------------------------------------------------------------
const STATS = [
  { id: 'stat-projects',     value: 40, suffix: '+',      label: 'Projects Delivered'       },
  { id: 'stat-satisfaction', value: 98, suffix: '%',      label: 'Client Satisfaction Rate' },
  { id: 'stat-timeline',     value: 6,  suffix: ' Weeks', label: 'Average Time to Launch'   },
  { id: 'stat-experience',   value: 5,  suffix: '+',      label: 'Years of Experience'      },
] as const

// ---------------------------------------------------------------------------
// StatsSection
// ---------------------------------------------------------------------------
export function StatsSection() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <div className="stats-inner">
        {/* Heading */}
        <h2 id="stats-heading" className="stats-heading">
          Results That Speak For Themselves
        </h2>

        {/* 4-column stat grid */}
        <div className="stats-grid" role="list">
          {STATS.map(({ id, value, suffix, label }) => (
            <div key={id} id={id} className="stats-item" role="listitem">
              {/* Large animated number */}
              <div className="stats-number" aria-hidden="true">
                <AnimatedCounter value={value} suffix={suffix} />
              </div>
              {/* Screen-reader friendly label with static final value */}
              <p className="stats-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
