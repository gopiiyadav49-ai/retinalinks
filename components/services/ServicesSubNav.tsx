'use client'

import * as React from 'react'

interface ServiceNavTab {
  id: string
  label: string
}

const SERVICE_TABS: ServiceNavTab[] = [
  { id: 'website-development', label: 'Website Development' },
  { id: 'app-development', label: 'App Development' },
  { id: 'logos', label: 'Logos' },
  { id: 'digital-marketing', label: 'Digital Marketing' },
]

export function ServicesSubNav() {
  const [activeId, setActiveId] = React.useState<string>(SERVICE_TABS[0].id)

  React.useEffect(() => {
    const handleScroll = () => {
      // Find the current active section based on scroll position
      const scrollPosition = window.scrollY + 200 // offset for sticky header

      for (let i = SERVICE_TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SERVICE_TABS[i].id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            setActiveId(SERVICE_TABS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const navOffset = 120 // Header + subnav height offset
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
      setActiveId(id)
    }
  }

  return (
    <nav className="services-subnav-wrapper" aria-label="Services Navigation">
      <div className="services-subnav-container">
        <ul className="services-subnav-list" role="tablist">
          {SERVICE_TABS.map((tab) => {
            const isActive = activeId === tab.id
            return (
              <li key={tab.id} role="presentation">
                <a
                  href={`#${tab.id}`}
                  onClick={(e) => scrollToSection(e, tab.id)}
                  className={`services-subnav-pill ${isActive ? 'services-subnav-pill--active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={tab.id}
                >
                  {tab.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
