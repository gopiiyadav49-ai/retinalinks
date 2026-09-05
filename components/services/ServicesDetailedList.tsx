'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Code2,
  Layers,
  Zap,
} from 'lucide-react'
import ClayCard from '@/components/ClayCard'
import { ClayIconDisplay } from '@/components/ClayIconButton'

const SERVICES_DATA = [
  {
    id: 'web-design',
    title: 'Web Design',
    category: 'Design & Interaction',
    icon: MonitorSmartphone,
    accent: 'peach' as const,
    accentColor: '#F5C6A5',
    tagline: 'High-converting digital experiences tailored to your audience.',
    description:
      'We craft websites that combine high aesthetic polish with conversion psychology. Every layout, typographic scale, and motion curve is engineered to guide visitors smoothly toward your core value proposition.',
    deliverables: [
      'Custom UI/UX Architecture & Wireframes',
      'Mobile-first responsive layouts for all screens',
      'Interactive micro-animations & motion design',
      'Core Web Vitals & SEO architecture',
      'Figma design tokens & reusable component systems',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Figma'],
    metric: '⚡ 99+ Performance & Core Web Vitals on Lighthouse',
  },
  {
    id: 'app-development',
    title: 'App Development',
    category: 'Mobile Engineering',
    icon: Smartphone,
    accent: 'lavender' as const,
    accentColor: '#C3BFF0',
    tagline: 'Fluid, high-performance mobile applications for iOS & Android.',
    description:
      'From zero to App Store and Google Play launch, we engineer native and cross-platform mobile apps with silky 60fps animations, intuitive gesture navigation, and robust offline capabilities.',
    deliverables: [
      'Cross-platform iOS & Android engineering',
      'Native device hardware integration (Biometrics, Camera, GPS)',
      'Offline-first cache & background synchronization',
      'Push notification pipelines & real-time messaging',
      'Automated CI/CD App Store & Play Store deployment',
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Supabase'],
    metric: '📱 60fps fluid touch response with sub-100ms latency',
  },
  {
    id: 'web-app-development',
    title: 'Web App Development',
    category: 'Full-Stack Platforms',
    icon: LayoutDashboard,
    accent: 'mint' as const,
    accentColor: '#A9DCD9',
    tagline: 'Scalable dashboards, enterprise portals, and SaaS platforms.',
    description:
      'We architect complex web applications built to handle real business workflows, high-concurrency data streams, and strict security requirements without sacrificing ease of use.',
    deliverables: [
      'Role-based access control (RBAC) & multi-tenancy',
      'Real-time dashboards, interactive charts & reporting',
      'Third-party payment & API integrations (Stripe, Webhooks)',
      'High-throughput database architecture with automated backups',
      'Serverless and Edge compute microservices',
    ],
    tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis'],
    metric: '🔒 99.9% availability with SOC2-ready architectural patterns',
  },
  {
    id: 'branding',
    title: 'Branding & Design Systems',
    category: 'Identity & Systems',
    icon: Sparkles,
    accent: 'pink' as const,
    accentColor: '#F0B8C4',
    tagline: 'Memorable brand identities and scalable multi-platform design systems.',
    description:
      'We help ambitious products establish an unmistakable visual signature. From logo design and color strategy to comprehensive UI design systems that accelerate development cycles.',
    deliverables: [
      'Logo mark, typography scales & visual identity guidelines',
      'Comprehensive color, elevation, and token systems',
      'Custom iconography & SVG asset toolkits',
      'Component library documentation with code-level guidelines',
      'Marketing collateral, pitch decks & social asset kits',
    ],
    tech: ['Figma', 'Design Tokens', 'Storybook', 'Adobe Suite'],
    metric: '✦ 100% brand consistency across web, mobile, and marketing',
  },
]

export default function ServicesDetailedList() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredServices =
    activeFilter === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.id === activeFilter)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Quick Filter Pill Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.625rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          style={{
            padding: '8px 18px',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.6)',
            background: activeFilter === 'all' ? 'var(--color-text-dark)' : 'rgba(255,255,255,0.7)',
            color: activeFilter === 'all' ? '#FAF6F0' : 'var(--color-text-mid)',
            boxShadow:
              activeFilter === 'all'
                ? '0 6px 16px rgba(61,43,31,0.18)'
                : '0 4px 12px rgba(200,160,130,0.12)',
            transition: 'all 0.2s ease',
          }}
        >
          All Capabilities ({SERVICES_DATA.length})
        </button>

        {SERVICES_DATA.map((s) => {
          const isActive = activeFilter === s.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveFilter(s.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.6)',
                background: isActive ? 'var(--color-text-dark)' : 'rgba(255,255,255,0.7)',
                color: isActive ? '#FAF6F0' : 'var(--color-text-mid)',
                boxShadow: isActive
                  ? '0 6px 16px rgba(61,43,31,0.18)'
                  : '0 4px 12px rgba(200,160,130,0.12)',
                transition: 'all 0.2s ease',
              }}
            >
              {s.title}
            </button>
          )
        })}
      </div>

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ClayCard
                  radius="lg"
                  hover
                  style={{
                    padding: 'clamp(2rem, 4vw, 3rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                  }}
                >
                  {/* Top Bar: Icon + Titles + Category Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      {/* Puffy 3D Sphere Icon */}
                      <div>
                        <ClayIconDisplay accent={service.accent} size={62}>
                          <Icon
                            size={28}
                            strokeWidth={1.8}
                            style={{ color: 'var(--color-text-dark)', position: 'relative', zIndex: 1 }}
                          />
                        </ClayIconDisplay>
                      </div>

                      <div>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-light)',
                          }}
                        >
                          {service.category}
                        </span>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            color: 'var(--color-text-dark)',
                            letterSpacing: '-0.02em',
                            marginTop: '0.2rem',
                          }}
                        >
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    {/* Metric badge */}
                    <div
                      style={{
                        padding: '6px 14px',
                        borderRadius: '100px',
                        background: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(255,255,255,0.9)',
                        boxShadow: '0 4px 12px rgba(200,160,130,0.12)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-text-dark)',
                      }}
                    >
                      {service.metric}
                    </div>
                  </div>

                  {/* Tagline & Main Description */}
                  <div>
                    <p
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: 'var(--color-text-dark)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {service.tagline}
                    </p>
                    <p
                      style={{
                        fontSize: '0.925rem',
                        color: 'var(--color-text-mid)',
                        lineHeight: 1.7,
                        maxWidth: '850px',
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Grid of Deliverables & Tech Stack */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2rem',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(200,160,130,0.18)',
                    }}
                  >
                    {/* Deliverables Column */}
                    <div>
                      <h3
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'var(--color-text-dark)',
                          marginBottom: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Layers size={15} style={{ color: service.accentColor }} />
                        Key Deliverables
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '0.875rem',
                              color: 'var(--color-text-mid)',
                              lineHeight: 1.5,
                            }}
                          >
                            <CheckCircle2
                              size={15}
                              style={{
                                color: service.accentColor,
                                flexShrink: 0,
                                marginTop: '3px',
                              }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack & CTA Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: 'var(--color-text-dark)',
                            marginBottom: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Code2 size={15} style={{ color: service.accentColor }} />
                          Technologies & Frameworks
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {service.tech.map((t) => (
                            <span
                              key={t}
                              style={{
                                padding: '5px 12px',
                                borderRadius: '100px',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                background: 'rgba(255,255,255,0.7)',
                                border: '1px solid rgba(255,255,255,0.9)',
                                color: 'var(--color-text-dark)',
                                boxShadow: '0 2px 6px rgba(200,160,130,0.1)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Link to Contact */}
                      <div style={{ marginTop: '1.75rem' }}>
                        <Link
                          href={`/contact?service=${service.id}`}
                          className="btn-primary"
                          style={{
                            padding: '9px 18px',
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          Inquire for {service.title} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ClayCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
