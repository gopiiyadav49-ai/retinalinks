'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ClayCard from '@/components/ClayCard'

const FAQS = [
  {
    q: 'How long does a typical web or mobile project take?',
    a: 'Most standard web design and development projects launch within 4 to 6 weeks. Full-scale mobile apps and complex SaaS platforms typically take 8 to 14 weeks depending on feature scope and integrations.',
  },
  {
    q: 'Can Retinalinks handle both design and development together?',
    a: 'Yes! We specialize in end-to-end builds. Handling both design and engineering under one roof eliminates handoff friction, ensuring what is designed in Figma matches 100% with the live production code.',
  },
  {
    q: 'What technologies do you recommend for high performance?',
    a: 'We build primarily with Next.js, React, TypeScript, and Tailwind CSS for web platforms, and React Native / Flutter for mobile. For backend and database infrastructure, we leverage Supabase, PostgreSQL, and serverless Node.js architectures.',
  },
  {
    q: 'Do you offer post-launch support and ongoing maintenance?',
    a: 'Absolutely. We offer dedicated monthly retainers covering performance monitoring, security patches, feature iterations, and analytics optimization so your team never has to worry about downtime.',
  },
]

export default function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <ClayCard
            key={faq.q}
            radius="sm"
            style={{
              padding: '1.25rem 1.75rem',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background 0.2s ease',
            }}
          >
            <div
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-text-dark)',
                  margin: 0,
                }}
              >
                {faq.q}
              </h3>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(200,160,130,0.15)',
                }}
              >
                <ChevronDown size={18} style={{ color: 'var(--color-text-dark)' }} />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-text-mid)',
                      lineHeight: 1.65,
                      marginTop: '0.875rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(200,160,130,0.15)',
                    }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </ClayCard>
        )
      })}
    </div>
  )
}
