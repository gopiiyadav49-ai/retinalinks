'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Step data — exact content as specified
// ---------------------------------------------------------------------------
const STEPS = [
  {
    id: 1,
    title: 'Discovery & Strategy',
    description:
      'We start by understanding your business, your users, and what success looks like.',
  },
  {
    id: 2,
    title: 'Design & Architecture',
    description:
      'Wireframes, UI design, and technical planning — so nothing gets built twice.',
  },
  {
    id: 3,
    title: 'Development',
    description: 'Clean, modern code, built to scale and easy to maintain.',
  },
  {
    id: 4,
    title: 'Testing & QA',
    description:
      'Every device, every browser, every edge case — before it ever reaches your users.',
  },
  {
    id: 5,
    title: 'Launch & Support',
    description:
      'We don’t disappear after launch. Ongoing support keeps things running smoothly.',
  },
] as const

// ---------------------------------------------------------------------------
// Custom step line icons
// ---------------------------------------------------------------------------
const STEP_ICONS: Record<number, React.ReactNode> = {
  1: (
    /* Magnifying glass for Discovery & Strategy */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8a3 3 0 0 0-3 3" strokeWidth="1.5" strokeOpacity="0.6" />
    </svg>
  ),
  2: (
    /* Pencil / drafting ruler for Design & Architecture */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <path d="M15 5l4 4" />
      <line x1="12" y1="18" x2="18" y2="18" strokeDasharray="2 2" strokeOpacity="0.6" />
    </svg>
  ),
  3: (
    /* Code brackets for Development */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" strokeOpacity="0.5" />
    </svg>
  ),
  4: (
    /* Checkmark-shield for Testing & QA */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" strokeWidth="2.2" />
    </svg>
  ),
  5: (
    /* Rocket launch for Launch & Support */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" strokeOpacity="0.6" />
      <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" strokeOpacity="0.6" />
    </svg>
  ),
}

// Marker component rendered on desktop and mobile
function StepMarker({ stepId }: { stepId: number }) {
  return (
    <div className="proc-marker-composite">
      <div className="proc-marker-icon">{STEP_ICONS[stepId]}</div>
      <span className="proc-marker-badge" aria-label={`Step ${stepId}`}>
        {stepId}
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProcessSection
// ---------------------------------------------------------------------------
export function ProcessSection() {
  return (
    <section className="proc-section" aria-labelledby="proc-heading">
      <div className="proc-inner">
        {/* Heading */}
        <header className="proc-header">
          <h2 id="proc-heading" className="proc-heading">
            How We Work
          </h2>
        </header>

        {/* Steps container */}
        <div className="proc-steps-wrap">
          {/* ── Marker row (icons + badges) — desktop only ── */}
          <div className="proc-markers-row" aria-hidden="true">
            {STEPS.map((step) => (
              <div key={step.id} className="proc-marker-col">
                <StepMarker stepId={step.id} />
              </div>
            ))}
          </div>

          {/* ── Step cards ── */}
          <ol className="proc-list">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.id}
                className="proc-item"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: i * 0.1,
                }}
              >
                {/* Mobile marker — visible only on mobile */}
                <div className="proc-mobile-marker" aria-hidden="true">
                  <StepMarker stepId={step.id} />
                  {/* Vertical connecting line (except after last item) */}
                  {i < STEPS.length - 1 && <div className="proc-mobile-line" />}
                </div>

                {/* Step text */}
                <div className="proc-text">
                  <h3 className="proc-step-title">{step.title}</h3>
                  <p className="proc-step-description">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
