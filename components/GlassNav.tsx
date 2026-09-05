'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, siteConfig } from '@/lib/tokens'

export default function GlassNav() {
  const pathname   = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 30)

      // Hide navbar when scrolling down past top threshold (80px), reveal on scroll up
      if (currentScrollY > 80 && currentScrollY > lastScrollY && !mobileOpen) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        setHidden(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setHidden(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ paddingTop: '16px' }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.nav
          animate={{
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
            backgroundColor: scrolled
              ? 'rgba(242,234,225,0.92)'
              : 'rgba(242,234,225,0)',
            boxShadow: scrolled
              ? '0 4px 32px rgba(200,160,130,0.2), 0 1px 0 rgba(255,255,255,0.7)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            borderRadius: scrolled ? '100px' : '0',
            border: scrolled ? '1px solid rgba(255,255,255,0.6)' : '1px solid transparent',
            padding: '8px clamp(16px, 3vw, 28px)',
            width: scrolled ? 'auto' : '100%',
            maxWidth: scrolled ? '860px' : '100%',
            pointerEvents: 'auto',
          }}
          className="flex items-center gap-4 md:gap-8 transition-all"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 no-underline"
            style={{ textDecoration: 'none' }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #F5C6A5, #C3BFF0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.6), 0 4px 10px rgba(200,140,100,0.25)',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#3D2B1F',
                }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--color-text-dark)',
                letterSpacing: '-0.02em',
              }}
            >
              Retinalinks
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {nav.links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: 'none',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '0.9rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--color-text-dark)' : 'var(--color-text-mid)',
                    background: active ? 'rgba(245,198,165,0.35)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.05)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-dark)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-mid)'
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA Desktop only */}
          <Link
            href={nav.cta.href}
            className="btn-primary nav-cta-desktop"
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            {nav.cta.label}
          </Link>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'rgba(245,198,165,0.3)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              color: 'var(--color-text-dark)',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: '16px',
              right: '16px',
              zIndex: 49,
              background: 'rgba(242,234,225,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 20px 40px rgba(200,160,130,0.2)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-text-dark)',
                  transition: 'background 0.2s ease',
                  display: 'block',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={nav.cta.href}
              className="btn-primary"
              style={{ marginTop: '8px', textAlign: 'center', justifyContent: 'center' }}
            >
              {nav.cta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
