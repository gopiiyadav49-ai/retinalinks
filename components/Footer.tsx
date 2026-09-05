'use client'

import Link from 'next/link'
import { siteConfig, nav } from '@/lib/tokens'
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react'

const socials = [
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github,    href: '#', label: 'GitHub'    },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-text-dark)',
        color: '#FAF6F0',
        padding: '4rem 1.5rem 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle blob decoration */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,198,165,0.12), rgba(195,191,240,0.06))',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(250,246,240,0.12)',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #F5C6A5, #C3BFF0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3D2B1F' }} />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {siteConfig.name}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(250,246,240,0.6)',
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              {siteConfig.tagline}
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: 'rgba(250,246,240,0.08)',
                    border: '1px solid rgba(250,246,240,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(250,246,240,0.7)',
                    transition: 'background 0.2s ease, color 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(245,198,165,0.2)'
                    el.style.color = '#F5C6A5'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(250,246,240,0.08)'
                    el.style.color = 'rgba(250,246,240,0.7)'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,240,0.4)',
                marginBottom: '1.25rem',
              }}
            >
              Pages
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    color: 'rgba(250,246,240,0.65)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FAF6F0' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,246,240,0.65)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,240,0.4)',
                marginBottom: '1.25rem',
              }}
            >
              Services
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Web Design', 'App Development', 'Web App Development', 'UI/UX Design', 'Maintenance'].map((s) => (
                <Link
                  key={s}
                  href="/services"
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    color: 'rgba(250,246,240,0.65)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FAF6F0' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,246,240,0.65)' }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div
            style={{
              background: 'rgba(245,198,165,0.12)',
              border: '1px solid rgba(245,198,165,0.2)',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: 1.3,
              }}
            >
              Have a project in mind?
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(250,246,240,0.6)', lineHeight: 1.6 }}>
              Let's build something great together.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F5C6A5',
                color: '#3D2B1F',
                padding: '10px 20px',
                borderRadius: '100px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'transform 0.18s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              Start a Project →
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.75rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'rgba(250,246,240,0.4)' }}>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(250,246,240,0.4)' }}>
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
