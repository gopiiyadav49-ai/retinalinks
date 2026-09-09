// Server Component — no 'use client'
import { getServices } from '@/lib/db/queries'
import type { Service } from '@/lib/db/schema'

// ---------------------------------------------------------------------------
// Fallback data — shown when the DB is unreachable (local dev without Supabase)
// Content matches scripts/seed-services.ts exactly.
// ---------------------------------------------------------------------------
const FALLBACK_SERVICES: Service[] = [
  {
    id: 1,
    title: 'Web Design',
    description:
      'Beautiful, fast, conversion-focused websites built to make the right first impression — anywhere in the world.',
    icon: 'layout',
    features: [
      'Custom UI/UX, not templates',
      'Mobile-first, sub-2-second load times',
      'Built for SEO from day one',
    ],
    order: 1,
  },
  {
    id: 2,
    title: 'App Development',
    description:
      'Native and cross-platform apps engineered for performance, built to scale with your user base.',
    icon: 'smartphone',
    features: [
      'iOS, Android & cross-platform',
      'Scalable backend architecture',
      'Post-launch support included',
    ],
    order: 2,
  },
  {
    id: 3,
    title: 'Web App Development',
    description:
      'Full-stack web applications — dashboards, portals, SaaS products — built on modern, maintainable architecture.',
    icon: 'monitor',
    features: [
      'Custom dashboards & internal tools',
      'Secure authentication & data handling',
      'API-first, integration-ready',
    ],
    order: 3,
  },
  {
    id: 4,
    title: 'Branding',
    description:
      'Logo, identity, and visual language that makes your company instantly recognizable and memorable.',
    icon: 'palette',
    features: [
      'Logo & visual identity systems',
      'Brand guidelines & style guides',
      'Marketing collateral & templates',
    ],
    order: 4,
  },
]

// ---------------------------------------------------------------------------
// Custom commission-style refined service icons
// ---------------------------------------------------------------------------
const ICONS: Record<string, React.ReactNode> = {
  layout: (
    /* Web Design — Refined browser window with structured layout */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Outer browser frame */}
      <rect x="2.5" y="3.5" width="19" height="17" rx="3" />
      {/* Chrome header */}
      <line x1="2.5" y1="8" x2="21.5" y2="8" />
      {/* 3 mini dots */}
      <circle cx="5.5" cy="5.75" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="5.75" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="5.75" r="0.75" fill="currentColor" stroke="none" />
      {/* Sidebar divider */}
      <line x1="8" y1="8" x2="8" y2="20.5" />
      {/* Layout content blocks */}
      <rect x="10.5" y="10.5" width="8.5" height="4" rx="1" fill="currentColor" fillOpacity="0.18" stroke="none" />
      <rect x="10.5" y="16" width="3.5" height="2.5" rx="0.5" fill="currentColor" fillOpacity="0.18" stroke="none" />
      <rect x="15.5" y="16" width="3.5" height="2.5" rx="0.5" fill="currentColor" fillOpacity="0.18" stroke="none" />
    </svg>
  ),
  smartphone: (
    /* App Development — Modern smartphone silhouette with dynamic notch & app cards */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Phone chassis */}
      <rect x="5" y="2" width="14" height="20" rx="3.5" />
      {/* Notch / Speaker island */}
      <line x1="10" y1="5" x2="14" y2="5" strokeWidth="2" strokeLinecap="round" />
      {/* App feed card */}
      <rect x="7.5" y="8" width="9" height="5" rx="1.5" fill="currentColor" fillOpacity="0.18" stroke="none" />
      <line x1="7.5" y1="15.5" x2="13.5" y2="15.5" />
      <line x1="7.5" y1="18" x2="11" y2="18" />
    </svg>
  ),
  monitor: (
    /* Web App Development — Multi-layered SaaS windows / dashboard */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Background layer window */}
      <path d="M6 3H19C20.1046 3 21 3.89543 21 5V14" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.6" />
      {/* Foreground primary dashboard window */}
      <rect x="3" y="6" width="16" height="15" rx="2.5" />
      <line x1="3" y1="10.5" x2="19" y2="10.5" />
      {/* Dashboard chart / data nodes */}
      <path d="M6 17L9 13.5L12 15.5L16 12" strokeWidth="1.75" />
      <circle cx="16" cy="12" r="1.25" fill="currentColor" />
    </svg>
  ),
  palette: (
    /* Branding — Precision pen-nib & geometric swatch palette */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Swatch card behind */}
      <path d="M4 14V5C4 3.89543 4.89543 3 6 3H14" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.6" />
      {/* Precision drafting pen / nib */}
      <path d="M12 4L20 12L14 18L6 10L12 4Z" />
      <path d="M6 10L3 21L14 18" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <line x1="12" y1="12.5" x2="3" y2="21" strokeWidth="1.5" />
    </svg>
  ),
}

// ---------------------------------------------------------------------------
// ServiceCard — renders one card from a Service row
// ---------------------------------------------------------------------------
function ServiceCard({ service }: { service: Service }) {
  const icon = ICONS[service.icon] ?? ICONS['layout']

  return (
    <article className="svc-card">
      {/* Duotone Icon bubble container */}
      <div className="svc-card-icon" aria-hidden="true">
        {icon}
      </div>

      {/* Title */}
      <h3 className="svc-card-title">{service.title}</h3>

      {/* Description */}
      <p className="svc-card-description">{service.description}</p>

      {/* Feature bullets */}
      <ul className="svc-card-features" aria-label={`${service.title} features`}>
        {service.features.map((feat) => (
          <li key={feat} className="svc-card-feature">
            <span className="svc-card-bullet" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 7L5.5 10L11.5 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {feat}
          </li>
        ))}
      </ul>
    </article>
  )
}

// ---------------------------------------------------------------------------
// ServicesSection — server component, fetches from DB
// ---------------------------------------------------------------------------
export async function ServicesSection() {
  // Try the DB; fall back to static seed data if unreachable
  let services: Service[]
  try {
    services = await getServices()
    if (services.length === 0) services = FALLBACK_SERVICES
  } catch {
    services = FALLBACK_SERVICES
  }

  return (
    <section className="svc-section" aria-labelledby="svc-heading">
      <div className="svc-inner">
        {/* Section header */}
        <header className="svc-header">
          <h2 id="svc-heading" className="svc-heading">
            What We Do
          </h2>
          <p className="svc-subheading">
            Four disciplines, one team — everything your brand needs to show up world-class
            online.
          </p>
        </header>

        {/* 2×2 card grid */}
        <div className="svc-grid" role="list">
          {services.map((svc) => (
            <div key={svc.id} role="listitem">
              <ServiceCard service={svc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
