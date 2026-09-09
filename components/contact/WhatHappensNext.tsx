import * as React from 'react'

const NEXT_STEPS = [
  {
    step: '01',
    timeframe: 'Within 24 Hours',
    title: 'Discovery Review',
    desc: 'Our lead product architect and design partner personally review your brief, tech stack, and scope to confirm alignment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    step: '02',
    timeframe: 'Day 2 – 3',
    title: 'Introductory Discovery Call',
    desc: 'A focused 20-minute discussion to clarify edge cases, milestones, delivery dates, and explore potential technical avenues.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 10l5 5-5 5" />
        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
      </svg>
    ),
  },
  {
    step: '03',
    timeframe: 'Day 4 – 5',
    title: 'Fixed-Scope Proposal',
    desc: 'You receive a transparent proposal with concrete weekly deliverables, architecture blueprint, fixed pricing, and SLAs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    step: '04',
    timeframe: 'Day 7',
    title: 'Sprint 0 Kickoff',
    desc: 'Direct Slack / Discord channel setup, GitHub repository provisioning, and immediate commencement of initial design sprints.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

export function WhatHappensNext() {
  return (
    <section className="contact-process-section" aria-labelledby="process-heading">
      <div className="contact-process-header">
        <span className="contact-process-eyebrow">CLEAR &amp; PREDICTABLE</span>
        <h2 id="process-heading" className="contact-process-title">
          What Happens Next?
        </h2>
        <p className="contact-process-subtitle">
          From first message to shipped product — we believe in radical transparency, swift communication, and zero ambiguity.
        </p>
      </div>

      <div className="contact-steps-grid">
        {NEXT_STEPS.map((item) => (
          <div key={item.step} className="contact-step-card">
            <div className="step-card-top">
              <span className="step-num">{item.step}</span>
              <span className="step-badge">{item.timeframe}</span>
            </div>
            <div className="step-card-icon">{item.icon}</div>
            <h3 className="step-title">{item.title}</h3>
            <p className="step-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
