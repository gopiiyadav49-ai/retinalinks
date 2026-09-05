'use client'

import { motion } from 'framer-motion'
import { Compass, PenTool, Code, Rocket } from 'lucide-react'
import ClayCard from '@/components/ClayCard'

const STEPS = [
  {
    step: '01',
    title: 'Discovery & Blueprint',
    desc: 'We map out your business objectives, target users, technical constraints, and create a comprehensive delivery roadmap.',
    icon: Compass,
    accentBg: '#F5C6A5',
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    desc: 'Translating wireframes into high-fidelity tactile clay prototypes with interactive micro-animations and validated user flows.',
    icon: PenTool,
    accentBg: '#C3BFF0',
  },
  {
    step: '03',
    title: 'Agile Engineering',
    desc: 'Production-ready code built with modern frameworks, rigorous unit tests, responsive layouts, and SEO best practices.',
    icon: Code,
    accentBg: '#A9DCD9',
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    desc: 'Seamless zero-downtime deployment, Core Web Vitals audits, analytics tracking, and continuous post-launch support.',
    icon: Rocket,
    accentBg: '#F0B8C4',
  },
]

export default function ServicesProcess() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        {STEPS.map((s, index) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex' }}
            >
              <ClayCard
                hover
                radius="md"
                style={{
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  position: 'relative',
                }}
              >
                {/* Header: Step Number & Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      color: 'var(--color-text-light)',
                      letterSpacing: '-0.04em',
                      opacity: 0.6,
                    }}
                  >
                    {s.step}
                  </span>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: s.accentBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow:
                        'inset 2px 2px 4px rgba(255,255,255,0.7), inset -2px -2px 4px rgba(0,0,0,0.1), 0 4px 10px rgba(200,160,130,0.2)',
                    }}
                  >
                    <Icon size={20} style={{ color: 'var(--color-text-dark)' }} />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: 'var(--color-text-dark)',
                    marginBottom: '0.625rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-mid)',
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {s.desc}
                </p>
              </ClayCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
