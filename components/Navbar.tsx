'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BrandLogo } from '@/components/ui/BrandLogo'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu on route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        {/* Brand Logo & Name */}
        <Link href="/" className="navbar-brand" aria-label="Retinalinks Home">
          <BrandLogo size="sm" variant="navbar" animated={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`navbar-link ${isActive ? 'navbar-link-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="navbar-actions">
          <Link href="/contact" className="navbar-cta" id="navbar-cta-btn">
            Start Your Project
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar-toggle"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="navbar-mobile-menu" id="mobile-nav-menu">
          <nav className="navbar-mobile-nav" aria-label="Mobile Navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`navbar-mobile-link ${isActive ? 'navbar-mobile-link-active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
            <div className="navbar-mobile-cta-wrap">
              <Link
                href="/contact"
                className="navbar-mobile-cta"
                onClick={() => setIsOpen(false)}
              >
                Start Your Project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
