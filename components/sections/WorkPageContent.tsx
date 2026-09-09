'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'

// ── Data ─────────────────────────────────────────────────────────────────────
interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
  tags: string[]
  domain: string
  liveUrl?: string
  year: string
  category: string
  highlight?: boolean
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'StaffEarn',
    description:
      'An AI-powered C2C IT recruitment platform built by Retinalinks that connects US IT recruiters with pre-vetted bench sales consultants across US and India timezones for faster candidate placement.',
    imageUrl: '/work-staffearn.png',
    tags: ['AI Platform', 'C2C Staffing', 'Web App'],
    domain: 'staffearn.com',
    liveUrl: 'https://staffearn.com',
    year: '2024',
    category: 'Web App',
    highlight: true,
  },
  {
    id: 2,
    title: 'HealthTrack',
    description:
      'A patient-management web app rebuilt for speed and clarity — cutting appointment scheduling time by half and giving clinics a dashboard their staff actually enjoy using.',
    imageUrl: '/work-healthtrack.jpg',
    tags: ['Web App', 'Healthcare', 'Dashboard'],
    domain: 'app.healthtrack.io',
    year: '2023',
    category: 'Web App',
  },
  {
    id: 3,
    title: 'StudioFlow',
    description:
      'A creative-studio booking platform designed to feel as polished as the studios it represents — real-time availability, seamless checkout, zero friction.',
    imageUrl: '/work-studioflow.jpg',
    tags: ['Web App', 'Booking', 'Design'],
    domain: 'studioflow.design',
    year: '2023',
    category: 'Web Design',
  },
  {
    id: 4,
    title: 'Auxano',
    description:
      'A brand and website overhaul for a growth consultancy — positioning them as the premium option in a crowded market.',
    imageUrl: '/work-auxano.jpg',
    tags: ['Branding', 'Web Design'],
    domain: 'auxano.consulting',
    year: '2022',
    category: 'Branding',
  },
]

const ALL_CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))]

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 22 })
  const brightness = useSpring(useTransform(rawX, [-0.5, 0.5], [0.92, 1.08]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(rawX, [-0.5, 0.5], ['10%', '90%'])
  const glareY = useTransform(rawY, [-0.5, 0.5], ['10%', '90%'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, delay: index * 0.1, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="work-card-perspective"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
    >
      <motion.div
        className={`work-card ${project.highlight ? 'work-card-flagship' : ''}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 12 }}
      >
        {/* Glare layer */}
        <motion.div
          className="work-card-glare"
          aria-hidden="true"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            ),
          }}
        />

        {/* Browser chrome frame */}
        <div className="work-browser-frame" style={{ transform: 'translateZ(4px)' }}>
          <div className="work-browser-bar" aria-hidden="true">
            <div className="work-browser-dots">
              <span className="work-dot work-dot-red" />
              <span className="work-dot work-dot-yellow" />
              <span className="work-dot work-dot-green" />
            </div>
            <div className="work-browser-address-bar">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>{project.domain}</span>
              {project.liveUrl && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              )}
            </div>
            {project.highlight && (
              <span className="work-live-badge">
                <span className="work-live-dot" />
                Live
              </span>
            )}
          </div>

          {/* Screenshot image */}
          <motion.div className="work-card-img-wrap" style={{ filter: useTransform(brightness, (b) => `brightness(${b})`) }}>
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              width={900}
              height={600}
              className="work-card-img"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 42vw"
            />
          </motion.div>
        </div>

        {/* Card body — sits below the browser frame, slightly deeper */}
        <div className="work-card-body" style={{ transform: 'translateZ(2px)' }}>
          <div className="work-card-meta-row">
            <div className="work-card-title-group">
              <h3 className="work-card-title">{project.title}</h3>
              <span className="work-card-year">{project.year}</span>
            </div>
            {project.highlight && <span className="work-creator-chip">Built by Retinalinks</span>}
          </div>

          <div className="work-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="work-tag">{tag}</span>
            ))}
          </div>

          <p className="work-card-desc">{project.description}</p>

          <div className="work-card-footer">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="work-visit-btn"
                id={`btn-visit-${project.id}`}
              >
                <span>Visit {project.domain}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : (
              <span className="work-domain-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {project.domain}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Work Page ────────────────────────────────────────────────────────────
export function WorkPageContent() {
  const [activeCategory, setActiveCategory] = React.useState('All')

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="work-page-root">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="work-hero" aria-labelledby="work-hero-heading">
        {/* Decorative orbital rings */}
        <div className="work-hero-rings" aria-hidden="true">
          <motion.div
            className="work-hero-ring work-hero-ring-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="work-hero-ring work-hero-ring-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="work-hero-ring work-hero-ring-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
          />
        </div>

        <div className="work-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="work-hero-eyebrow">SELECTED WORK</span>
          </motion.div>

          <motion.h1
            id="work-hero-heading"
            className="work-hero-title"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          >
            Products we&apos;re{' '}
            <span className="work-title-gradient">proud to ship.</span>
          </motion.h1>

          <motion.p
            className="work-hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65, ease: 'easeOut' }}
          >
            A curated showcase of the digital products, platforms, and brand systems we&apos;ve engineered — each one built to perform, built to last.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="work-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="work-hero-stat">
              <span className="work-hero-stat-num">40+</span>
              <span className="work-hero-stat-label">Projects Shipped</span>
            </div>
            <div className="work-hero-stat-sep" aria-hidden="true" />
            <div className="work-hero-stat">
              <span className="work-hero-stat-num">4</span>
              <span className="work-hero-stat-label">Featured Below</span>
            </div>
            <div className="work-hero-stat-sep" aria-hidden="true" />
            <div className="work-hero-stat">
              <span className="work-hero-stat-num">0</span>
              <span className="work-hero-stat-label">Missed Deadlines</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────────────── */}
      <section className="work-filters-section" aria-label="Filter by category">
        <div className="work-container">
          <motion.div
            className="work-filter-bar"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
            role="tablist"
            aria-label="Project categories"
          >
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`work-filter-tab ${activeCategory === cat ? 'work-filter-tab-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`tab-work-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="work-filter-count">
                    {PROJECTS.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3D CARDS GRID ────────────────────────────────────────────── */}
      <section className="work-grid-section" aria-label="Project portfolio">
        <div className="work-container">
          <motion.div
            key={activeCategory}
            className="work-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <TiltCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="work-empty">
              <span>No projects in this category yet.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="work-cta-section" aria-labelledby="work-cta-heading">
        <div className="work-container">
          <motion.div
            className="work-cta-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <span className="work-cta-eyebrow">WANT RESULTS LIKE THESE?</span>
            <h2 id="work-cta-heading" className="work-cta-title">
              Your product could be next.
            </h2>
            <p className="work-cta-sub">
              We&apos;re selectively accepting new client partnerships. If you have an ambitious project and high expectations — we&apos;re your team.
            </p>
            <div className="work-cta-actions">
              <Link href="/contact" className="work-cta-btn-primary" id="btn-work-cta">
                Start a Project
              </Link>
              <Link href="/about" className="work-cta-btn-secondary">
                Meet the Team →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
