'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Step {
  number: number
  title: string
  description?: string
}

interface ProcessDiagramProps {
  steps: string[]
  serviceTheme?: 'indigo' | 'emerald' | 'violet' | 'cyan'
}

export function ProcessDiagram({ steps, serviceTheme = 'indigo' }: ProcessDiagramProps) {
  const prefersReducedMotion = useReducedMotion()

  // Format steps into structured objects
  const stepItems: Step[] = steps.map((title, i) => ({
    number: i + 1,
    title,
  }))

  return (
    <div className={`process-diagram-wrap process-theme--${serviceTheme}`} aria-label="Step-by-step process diagram">
      <div className="process-diagram-scroll-container">
        <div className="process-diagram-track">
          {stepItems.map((step, index) => {
            const isLast = index === stepItems.length - 1
            const delayTime = prefersReducedMotion ? 0 : index * 0.22

            return (
              <React.Fragment key={step.number}>
                {/* Process Step Node */}
                <motion.div
                  className="process-node"
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85, y: 12 }}
                  whileInView={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.45,
                    delay: delayTime,
                    ease: [0.2, 0, 0, 1],
                  }}
                >
                  <div className="process-node-circle">
                    <span className="process-node-number">{step.number}</span>
                  </div>
                  <span className="process-node-title">{step.title}</span>
                </motion.div>

                {/* Connecting Animated Line (between nodes) */}
                {!isLast && (
                  <div className="process-connector" aria-hidden="true">
                    <svg
                      className="process-connector-svg"
                      width="100%"
                      height="24"
                      viewBox="0 0 80 24"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Background Guide Line */}
                      <line
                        x1="0"
                        y1="12"
                        x2="80"
                        y2="12"
                        stroke="#E8E6E0"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Animated Drawing Path */}
                      <motion.line
                        x1="0"
                        y1="12"
                        x2="80"
                        y2="12"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.4,
                          delay: prefersReducedMotion ? 0 : delayTime + 0.15,
                          ease: 'easeInOut',
                        }}
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
