'use client'

import * as React from 'react'
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'
import Link from 'next/link'

// ── Animated Stat counter
function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = value
    const duration = 1600
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="about-stat-item">
      <span className="about-stat-value">{count}{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  )
}

// ── Stagger children wrapper
function StaggerParent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

// ── Team members
const TEAM = [
  {
    name: 'Ayaan Khan',
    role: 'Founder & Lead Engineer',
    bio: 'Full-stack engineer obsessed with performance-first architecture and pixel-perfect interfaces. 5+ years shipping premium digital products.',
    gradient: 'from-indigo-500 to-violet-600',
    initials: 'AK',
    links: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sara Malik',
    role: 'Head of Design & Brand',
    bio: 'Strategic design director with a deep focus on conversion-centred UX, brand systems, and elegant interaction design.',
    gradient: 'from-cyan-500 to-indigo-600',
    initials: 'SM',
    links: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Raza Ali',
    role: 'Mobile & Backend Lead',
    bio: 'Expert in scalable cloud infrastructure, native app architectures, and secure API design across iOS, Android, and serverless stacks.',
    gradient: 'from-violet-600 to-blue-600',
    initials: 'RA',
    links: { linkedin: '#', twitter: '#' },
  },
]

// ── Core values
const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Speed Without Compromise',
    desc: 'We ship in weeks, not months. Our engineering processes are optimised for velocity while our quality bar remains sky-high.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Craft in Every Pixel',
    desc: 'Interfaces are not just functional — they should be beautiful, intentional, and memorable. We treat every detail with deliberate care.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Radical Transparency',
    desc: 'Fixed-scope, fixed-price engagements with weekly updates, clear milestones, and direct lines to whoever is building your product.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Long-Term Partnership',
    desc: 'We don\'t disappear after delivery. We remain technical partners — maintaining, iterating, and scaling as your company grows.',
  },
]

// ── Technology Stack
const TECH_STACK = [
  { name: 'Next.js', color: '#000000' },
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Vercel', color: '#000000' },
  { name: 'GSAP', color: '#88CE02' },
  { name: 'Three.js', color: '#000000' },
]

// ── Timeline milestones
const MILESTONES = [
  { year: '2019', title: 'The Beginning', desc: 'Founded as a one-person freelance studio, building high-impact websites for early-stage startups.' },
  { year: '2021', title: 'First Studio Team', desc: 'Grew to a focused cross-functional team of 3, expanding into mobile apps and full SaaS product development.' },
  { year: '2022', title: 'Global Clients', desc: 'Began serving clients across 3 continents — US, UK, and UAE — delivering enterprise-grade digital products.' },
  { year: '2023', title: '40+ Projects Shipped', desc: 'Crossed the 40-project milestone with a 98% client satisfaction record and zero missed deadlines.' },
  { year: '2024', title: 'Premium-Only Studio', desc: 'Repositioned as an invite-only premium digital studio, serving ambitious companies with outsized expectations.' },
  { year: '2025', title: 'Retinalinks v2', desc: 'Launched our new brand identity, refined service offering, and industry-leading 7-day kickoff guarantee.' },
]

export function AboutPageContent() {
  const heroRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="about-page-root">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="about-hero-section" aria-labelledby="about-heading">
        <motion.div className="about-hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="about-hero-eyebrow-wrap"
          >
            <span className="about-hero-eyebrow">OUR STORY</span>
          </motion.div>

          <motion.h1
            id="about-heading"
            className="about-hero-title"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            We build digital products that{' '}
            <span className="text-gradient">outlast trends.</span>
          </motion.h1>

          <motion.p
            className="about-hero-subtext"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Retinalinks is a premium digital engineering studio. We partner with ambitious companies to design, engineer, and ship world-class digital experiences — from first sketch to scaled product.
          </motion.p>

          <motion.div
            className="about-hero-ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className="about-cta-primary" id="btn-about-start">
              Start a Project
            </Link>
            <Link href="/work" className="about-cta-secondary">
              View Our Work →
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated decorative background rings */}
        <div className="about-hero-rings" aria-hidden="true">
          <motion.div
            className="about-ring about-ring-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="about-ring about-ring-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="about-ring about-ring-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
          />
        </div>
      </section>

      {/* ── ANIMATED STATS BAR ───────────────────────────────────── */}
      <section className="about-stats-section" aria-label="Studio statistics">
        <div className="about-stats-inner">
          <AnimatedStat value={40} suffix="+" label="Projects Shipped" />
          <div className="about-stat-divider" aria-hidden="true" />
          <AnimatedStat value={98} suffix="%" label="Client Satisfaction" />
          <div className="about-stat-divider" aria-hidden="true" />
          <AnimatedStat value={5} suffix="+" label="Years of Excellence" />
          <div className="about-stat-divider" aria-hidden="true" />
          <AnimatedStat value={3} label="Continents Served" />
        </div>
      </section>

      {/* ── MISSION STATEMENT ────────────────────────────────────── */}
      <section className="about-mission-section" aria-labelledby="mission-heading">
        <div className="about-container">
          <div className="about-mission-grid">
            <motion.div
              className="about-mission-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="about-section-eyebrow">OUR MISSION</span>
              <h2 id="mission-heading" className="about-section-title">
                The internet deserves better products.
              </h2>
              <p className="about-mission-text">
                Too many companies are stuck with slow, generic, forgettable digital products built from templates and managed by agencies who disappear after delivery.
              </p>
              <p className="about-mission-text">
                We exist to fix that. We embed as your technical partner — bringing elite engineering, strategic design, and rigorous execution to every project we touch. The result: products that are fast, beautiful, and built to grow.
              </p>
              <div className="about-mission-badge-row">
                <span className="about-mission-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Zero-template work
                </span>
                <span className="about-mission-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Fixed-scope guarantee
                </span>
                <span className="about-mission-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  7-day kickoff
                </span>
              </div>
            </motion.div>

            <motion.div
              className="about-mission-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="about-mission-card-stack">
                <div className="about-mission-card about-mission-card-1">
                  <div className="mission-card-dot mission-dot-green" />
                  <span>Product shipped in 6 weeks</span>
                </div>
                <div className="about-mission-card about-mission-card-2">
                  <div className="mission-card-dot mission-dot-indigo" />
                  <span>98% client satisfaction</span>
                </div>
                <div className="about-mission-card about-mission-card-3">
                  <div className="mission-card-dot mission-dot-cyan" />
                  <span>Zero missed deadlines</span>
                </div>
                <div className="about-mission-pulse-ring" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────── */}
      <section className="about-values-section" aria-labelledby="values-heading">
        <div className="about-container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-section-eyebrow">PRINCIPLES</span>
            <h2 id="values-heading" className="about-section-title">How we think. How we work.</h2>
            <p className="about-section-sub">Four principles that govern every decision we make — from architecture choices to client communication.</p>
          </motion.div>

          <StaggerParent className="about-values-grid">
            {VALUES.map((v) => (
              <motion.div key={v.title} className="about-value-card" variants={fadeUp}>
                <div className="about-value-icon">{v.icon}</div>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section className="about-timeline-section" aria-labelledby="timeline-heading">
        <div className="about-container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-section-eyebrow">OUR JOURNEY</span>
            <h2 id="timeline-heading" className="about-section-title">A Studio Built on Milestones</h2>
          </motion.div>

          <div className="about-timeline">
            <div className="about-timeline-line" aria-hidden="true" />
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.year}
                className={`about-timeline-item ${idx % 2 === 0 ? 'tl-left' : 'tl-right'}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="about-timeline-dot" aria-hidden="true">
                  <div className="about-timeline-dot-inner" />
                </div>
                <div className="about-timeline-card">
                  <span className="about-timeline-year">{m.year}</span>
                  <h3 className="about-timeline-title">{m.title}</h3>
                  <p className="about-timeline-desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="about-team-section" aria-labelledby="team-heading">
        <div className="about-container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-section-eyebrow">THE TEAM</span>
            <h2 id="team-heading" className="about-section-title">The People Behind the Work</h2>
            <p className="about-section-sub">A tight-knit team of engineers, designers, and product thinkers with one shared obsession: building exceptional digital products.</p>
          </motion.div>

          <StaggerParent className="about-team-grid">
            {TEAM.map((member) => (
              <motion.div key={member.name} className="about-team-card" variants={fadeUp}>
                <div className={`about-team-avatar bg-gradient-to-br ${member.gradient}`}>
                  <span className="about-team-initials">{member.initials}</span>
                  <div className="about-team-avatar-ring" />
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <span className="about-team-role">{member.role}</span>
                  <p className="about-team-bio">{member.bio}</p>
                  <div className="about-team-socials">
                    <a href={member.links.linkedin} className="about-team-social-link" aria-label={`${member.name} LinkedIn`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href={member.links.twitter} className="about-team-social-link" aria-label={`${member.name} Twitter`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────── */}
      <section className="about-tech-section" aria-labelledby="tech-heading">
        <div className="about-container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-section-eyebrow">TECHNOLOGY</span>
            <h2 id="tech-heading" className="about-section-title">Our Technology Stack</h2>
            <p className="about-section-sub">We choose tools that are modern, proven, and best-in-class for each discipline.</p>
          </motion.div>

          <StaggerParent className="about-tech-grid">
            {TECH_STACK.map((tech) => (
              <motion.div key={tech.name} className="about-tech-chip" variants={fadeUp}>
                <div className="about-tech-dot" style={{ backgroundColor: tech.color }} />
                <span className="about-tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────── */}
      <section className="about-closing-section" aria-labelledby="about-cta-heading">
        <motion.div
          className="about-closing-inner"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="about-section-eyebrow">READY TO BUILD?</span>
          <h2 id="about-cta-heading" className="about-closing-title">
            Your next product starts here.
          </h2>
          <p className="about-closing-sub">
            We&apos;re selectively accepting new client partnerships for Q3/Q4. If you have an ambitious product — let&apos;s talk.
          </p>
          <div className="about-closing-actions">
            <Link href="/contact" className="about-cta-primary" id="btn-about-cta-bottom">
              Start Your Project
            </Link>
            <Link href="/services" className="about-cta-secondary">
              See Our Services →
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
