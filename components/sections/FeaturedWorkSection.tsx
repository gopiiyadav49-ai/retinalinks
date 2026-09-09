// Server Component — no 'use client'
import Image from 'next/image'
import { getPortfolioItems } from '@/lib/db/queries'
import type { PortfolioItem } from '@/lib/db/schema'

// ---------------------------------------------------------------------------
// Fallback data — shown when the DB is unreachable (local dev without Supabase)
// Content and imageUrls match scripts/seed-portfolio.ts exactly.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Fallback data — shown when the DB is unreachable (local dev without Supabase)
// Content and imageUrls match scripts/seed-portfolio.ts exactly.
// ---------------------------------------------------------------------------
const FALLBACK_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'StaffEarn',
    description:
      'An AI-powered C2C IT recruitment platform built by Retinalinks that connects US IT recruiters with pre-vetted bench sales consultants across US and India timezones for faster candidate placement.',
    imageUrl: '/work-staffearn.png',
    tags: ['AI Platform', 'C2C Staffing', 'Web App'],
    order: 1,
  },
  {
    id: 2,
    title: 'HealthTrack',
    description:
      'A patient-management web app rebuilt for speed and clarity — cutting appointment scheduling time by half and giving clinics a dashboard their staff actually enjoy using.',
    imageUrl: '/work-healthtrack.jpg',
    tags: ['Web App', 'Healthcare', 'Dashboard'],
    order: 2,
  },
  {
    id: 3,
    title: 'StudioFlow',
    description:
      'A creative-studio booking platform designed to feel as polished as the studios it represents — real-time availability, seamless checkout, zero friction.',
    imageUrl: '/work-studioflow.jpg',
    tags: ['Web App', 'Booking', 'Design'],
    order: 3,
  },
  {
    id: 4,
    title: 'Auxano',
    description:
      'A brand and website overhaul for a growth consultancy — positioning them as the premium option in a crowded market.',
    imageUrl: '/work-auxano.jpg',
    tags: ['Branding', 'Web Design'],
    order: 4,
  },
]

// Project domains for realistic browser chrome address bar
const PROJECT_DOMAINS: Record<string, string> = {
  StaffEarn: 'staffearn.com',
  HealthTrack: 'app.healthtrack.io',
  StudioFlow: 'studioflow.design',
  Auxano: 'auxano.consulting',
}

// Live external links for launched projects
const PROJECT_LINKS: Record<string, string> = {
  StaffEarn: 'https://staffearn.com',
}

// ---------------------------------------------------------------------------
// PortfolioCard — renders one project card with browser-chrome mockup
// ---------------------------------------------------------------------------
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const domain = PROJECT_DOMAINS[item.title] ?? `${item.title.toLowerCase().replace(/\s+/g, '')}.com`
  const externalLink = PROJECT_LINKS[item.title]
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]/g, '')
  const isFlagship = item.title === 'StaffEarn'

  return (
    <article className={`fw-card ${isFlagship ? 'fw-card-flagship' : ''}`} data-project={slug}>
      {/* Browser-chrome window mockup frame */}
      <div className="fw-browser-frame">
        {/* Top chrome bar */}
        <div className="fw-browser-bar" aria-hidden="true">
          {/* macOS-style 3 dots */}
          <div className="fw-browser-dots">
            <span className="fw-browser-dot fw-dot-close" />
            <span className="fw-browser-dot fw-dot-min" />
            <span className="fw-browser-dot fw-dot-max" />
          </div>

          {/* Address bar strip (interactive link if live) */}
          {externalLink ? (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="fw-browser-address fw-browser-address-link"
              title={`Visit live site: ${domain}`}
            >
              <svg
                className="fw-browser-lock"
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="fw-browser-domain">{domain}</span>
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fw-external-arrow"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <div className="fw-browser-address">
              <svg
                className="fw-browser-lock"
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="fw-browser-domain">{domain}</span>
            </div>
          )}

          {/* Optional live badge for launched products */}
          {isFlagship && (
            <span className="fw-live-indicator" title="Live in Production">
              <span className="fw-live-dot" />
              <span className="fw-live-text">Live Platform</span>
            </span>
          )}
        </div>

        {/* Image container inside the browser frame */}
        <div className="fw-card-image-wrap">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={800}
            height={534}
            className="fw-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="fw-card-body">
        <div className="fw-card-header-row">
          <h3 className="fw-card-title">{item.title}</h3>
          {isFlagship && (
            <span className="fw-creator-chip">Built by Retinalinks</span>
          )}
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="fw-card-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="fw-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="fw-card-description">{item.description}</p>

        {externalLink && (
          <div className="fw-card-action">
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="fw-visit-btn"
            >
              <span>Explore staffearn.com</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// FeaturedWorkSection — server component
// ---------------------------------------------------------------------------
export async function FeaturedWorkSection() {
  let items: PortfolioItem[]
  try {
    items = await getPortfolioItems()
    if (items.length === 0) items = FALLBACK_ITEMS
  } catch {
    items = FALLBACK_ITEMS
  }

  return (
    <section className="fw-section" aria-labelledby="fw-heading">
      <div className="fw-inner">
        {/* Section header */}
        <header className="fw-header">
          <h2 id="fw-heading" className="fw-heading">
            Selected Work
          </h2>
          <p className="fw-subheading">
            A few of the products we&apos;ve helped bring to life.
          </p>
        </header>

        {/* 3-column card grid */}
        <div className="fw-grid" role="list">
          {items.map((item) => (
            <div key={item.id} role="listitem">
              <PortfolioCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
