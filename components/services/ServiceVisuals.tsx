'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ===========================================================================
// 1. INTRO REPRESENTATIVE GRAPHICS (Step 2a)
// ===========================================================================

export function WebsiteIntroGraphic() {
  return (
    <div className="svc-intro-visual svc-intro-visual--web" aria-hidden="true">
      <svg viewBox="0 0 440 320" fill="none" className="svc-intro-svg">
        <rect x="20" y="20" width="400" height="280" rx="14" fill="#FFFFFF" stroke="#E8E6E0" strokeWidth="1.5" />
        {/* Header */}
        <path d="M20 34C20 26.268 26.268 20 34 20H406C413.732 20 420 26.268 420 34V54H20V34Z" fill="#F8F8F5" stroke="#E8E6E0" strokeWidth="1.5" />
        <circle cx="38" cy="37" r="4" fill="#EF4444" opacity="0.8" />
        <circle cx="52" cy="37" r="4" fill="#F59E0B" opacity="0.8" />
        <circle cx="66" cy="37" r="4" fill="#10B981" opacity="0.8" />
        <rect x="110" y="28" width="180" height="18" rx="9" fill="#FFFFFF" stroke="#E8E6E0" />
        {/* Sidebar */}
        <rect x="20" y="55" width="70" height="244" fill="#FAFAF7" stroke="#E8E6E0" strokeWidth="1" />
        <rect x="34" y="75" width="42" height="6" rx="3" fill="#4F46E5" opacity="0.8" />
        <rect x="34" y="95" width="36" height="5" rx="2.5" fill="#D4D4D8" />
        <rect x="34" y="112" width="38" height="5" rx="2.5" fill="#D4D4D8" />
        <rect x="34" y="129" width="32" height="5" rx="2.5" fill="#D4D4D8" />
        {/* Main Content Hero Mock */}
        <rect x="110" y="75" width="160" height="14" rx="4" fill="#14141A" opacity="0.85" />
        <rect x="110" y="98" width="220" height="7" rx="3.5" fill="#73706B" opacity="0.5" />
        {/* Cards */}
        <rect x="110" y="122" width="90" height="65" rx="8" fill="#F4F2ED" stroke="#E8E6E0" />
        <rect x="215" y="122" width="90" height="65" rx="8" fill="#EEF2FF" stroke="#C7D2FE" />
        <rect x="320" y="122" width="85" height="65" rx="8" fill="#F4F2ED" stroke="#E8E6E0" />
        {/* Wave graph banner */}
        <rect x="110" y="202" width="295" height="80" rx="8" fill="#FAFAF7" stroke="#E8E6E0" />
        <path d="M120 250C160 230 190 265 240 235C280 210 320 250 395 220" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function AppIntroGraphic() {
  return (
    <div className="svc-intro-visual svc-intro-visual--app" aria-hidden="true">
      <svg viewBox="0 0 380 320" fill="none" className="svc-intro-svg">
        {/* Smartphone Chassis */}
        <rect x="100" y="15" width="180" height="290" rx="26" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="2" />
        <rect x="106" y="21" width="168" height="278" rx="22" fill="#F8F8F5" />
        {/* Dynamic Island */}
        <rect x="155" y="28" width="70" height="12" rx="6" fill="#18181B" />
        {/* Screen Header */}
        <rect x="122" y="58" width="75" height="8" rx="4" fill="#14141A" opacity="0.8" />
        <rect x="122" y="72" width="48" height="5" rx="2.5" fill="#73706B" opacity="0.6" />
        <circle cx="254" cy="65" r="10" fill="#EEF2FF" />
        {/* App Feature Card */}
        <rect x="120" y="92" width="140" height="75" rx="12" fill="#FFFFFF" stroke="#E8E6E0" />
        <rect x="132" y="106" width="60" height="8" rx="4" fill="#4F46E5" />
        <rect x="132" y="122" width="116" height="5" rx="2.5" fill="#F4F2ED" />
        <rect x="132" y="133" width="90" height="5" rx="2.5" fill="#F4F2ED" />
        {/* Mini Feed Items */}
        <rect x="120" y="178" width="140" height="34" rx="8" fill="#FFFFFF" stroke="#E8E6E0" />
        <circle cx="138" cy="195" r="7" fill="#10B981" opacity="0.2" />
        <rect x="152" y="192" width="70" height="6" rx="3" fill="#14141A" opacity="0.75" />
        <rect x="120" y="220" width="140" height="34" rx="8" fill="#FFFFFF" stroke="#E8E6E0" />
        <circle cx="138" cy="237" r="7" fill="#6366F1" opacity="0.2" />
        <rect x="152" y="234" width="65" height="6" rx="3" fill="#14141A" opacity="0.75" />
        {/* Bottom Tab Bar */}
        <rect x="106" y="265" width="168" height="34" rx="16" fill="#FFFFFF" stroke="#E8E6E0" />
        <circle cx="135" cy="282" r="5" fill="#4F46E5" />
        <circle cx="165" cy="282" r="5" fill="#D4D4D8" />
        <circle cx="195" cy="282" r="5" fill="#D4D4D8" />
        <circle cx="225" cy="282" r="5" fill="#D4D4D8" />
      </svg>
    </div>
  )
}

export function LogosIntroGraphic() {
  return (
    <div className="svc-intro-visual svc-intro-visual--logo" aria-hidden="true">
      <svg viewBox="0 0 400 320" fill="none" className="svc-intro-svg">
        {/* Drafting canvas with grid lines */}
        <rect x="25" y="20" width="350" height="280" rx="14" fill="#FFFFFF" stroke="#E8E6E0" strokeWidth="1.5" />
        <line x1="25" y1="90" x2="375" y2="90" stroke="#F4F2ED" strokeDasharray="3 3" />
        <line x1="25" y1="160" x2="375" y2="160" stroke="#F4F2ED" strokeDasharray="3 3" />
        <line x1="25" y1="230" x2="375" y2="230" stroke="#F4F2ED" strokeDasharray="3 3" />
        <line x1="112" y1="20" x2="112" y2="300" stroke="#F4F2ED" strokeDasharray="3 3" />
        <line x1="200" y1="20" x2="200" y2="300" stroke="#F4F2ED" strokeDasharray="3 3" />
        <line x1="288" y1="20" x2="288" y2="300" stroke="#F4F2ED" strokeDasharray="3 3" />

        {/* Geometric Drafting Mark */}
        <circle cx="200" cy="160" r="70" stroke="#4F46E5" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="170" cy="160" r="45" stroke="#14141A" strokeWidth="2.5" />
        <circle cx="230" cy="160" r="45" stroke="#6366F1" strokeWidth="2.5" />
        <circle cx="200" cy="160" r="12" fill="#4F46E5" />

        {/* Precision Coordinate Callouts */}
        <rect x="50" y="45" width="85" height="22" rx="11" fill="#EEF2FF" stroke="#C7D2FE" />
        <text x="62" y="60" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#4F46E5">RADIUS: 70px</text>
        <rect x="260" y="250" width="95" height="22" rx="11" fill="#F4F2ED" stroke="#E8E6E0" />
        <text x="272" y="265" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#73706B">GOLDEN RATIO</text>
      </svg>
    </div>
  )
}

export function MarketingIntroGraphic() {
  return (
    <div className="svc-intro-visual svc-intro-visual--mkt" aria-hidden="true">
      <svg viewBox="0 0 420 320" fill="none" className="svc-intro-svg">
        <rect x="25" y="20" width="370" height="280" rx="14" fill="#FFFFFF" stroke="#E8E6E0" strokeWidth="1.5" />
        {/* Metric tiles */}
        <rect x="50" y="45" width="95" height="50" rx="8" fill="#EEF2FF" stroke="#C7D2FE" />
        <text x="62" y="65" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#4F46E5">ROI</text>
        <text x="62" y="83" fontFamily="sans-serif" fontSize="15" fontWeight="800" fill="#14141A">4.8x</text>

        <rect x="160" y="45" width="105" height="50" rx="8" fill="#F4F2ED" stroke="#E8E6E0" />
        <text x="172" y="65" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#73706B">CONVERSION</text>
        <text x="172" y="83" fontFamily="sans-serif" fontSize="15" fontWeight="800" fill="#14141A">+320%</text>

        <rect x="280" y="45" width="95" height="50" rx="8" fill="#F4F2ED" stroke="#E8E6E0" />
        <text x="292" y="65" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#73706B">CAC</text>
        <text x="292" y="83" fontFamily="sans-serif" fontSize="15" fontWeight="800" fill="#10B981">-42%</text>

        {/* Funnel / Growth Path */}
        <path d="M50 250 C120 240, 180 180, 240 160 C290 145, 330 120, 370 110" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
        <circle cx="240" cy="160" r="5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2.5" />
        <circle cx="370" cy="110" r="5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2.5" />
      </svg>
    </div>
  )
}

// ===========================================================================
// 2. WIREFRAME MOCKUP (Step 5: Website & App Development)
// ===========================================================================

export function WebsiteWireframeVisual() {
  return (
    <div className="wireframe-mockup-wrapper" aria-label="Schematic website wireframe visual">
      <div className="wireframe-mockup-card">
        <div className="wireframe-mockup-badge">LOW-FIDELITY WIREFRAME</div>
        {/* Desktop Schematic Frame */}
        <div className="wireframe-desktop-frame">
          <div className="wireframe-top-bar">
            <div className="wireframe-dots">
              <span className="wireframe-dot" />
              <span className="wireframe-dot" />
              <span className="wireframe-dot" />
            </div>
            <div className="wireframe-url-bar" />
          </div>

          <div className="wireframe-body">
            {/* Header / Nav block */}
            <div className="wireframe-nav-block">
              <div className="wireframe-logo-placeholder" />
              <div className="wireframe-nav-links">
                <div className="wireframe-link-bar" />
                <div className="wireframe-link-bar" />
                <div className="wireframe-link-bar" />
              </div>
              <div className="wireframe-button-placeholder" />
            </div>

            {/* Hero Section Layout */}
            <div className="wireframe-hero-layout">
              <div className="wireframe-hero-text">
                <div className="wireframe-eyebrow-bar" />
                <div className="wireframe-heading-bar wireframe-heading-bar--wide" />
                <div className="wireframe-heading-bar" />
                <div className="wireframe-para-bar" />
                <div className="wireframe-para-bar wireframe-para-bar--short" />
                <div className="wireframe-cta-group">
                  <div className="wireframe-btn wireframe-btn--solid" />
                  <div className="wireframe-btn wireframe-btn--outline" />
                </div>
              </div>

              {/* Graphic Block with Cross-Hatch */}
              <div className="wireframe-graphic-box">
                <svg width="100%" height="100%" viewBox="0 0 160 120" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="160" y2="120" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="160" y1="0" x2="0" y2="120" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
                <span className="wireframe-box-label">Image / Media Placeholder</span>
              </div>
            </div>

            {/* 3-Column Content Block */}
            <div className="wireframe-columns-grid">
              <div className="wireframe-col-card">
                <div className="wireframe-icon-placeholder" />
                <div className="wireframe-card-title-bar" />
                <div className="wireframe-card-para-bar" />
              </div>
              <div className="wireframe-col-card">
                <div className="wireframe-icon-placeholder" />
                <div className="wireframe-card-title-bar" />
                <div className="wireframe-card-para-bar" />
              </div>
              <div className="wireframe-col-card">
                <div className="wireframe-icon-placeholder" />
                <div className="wireframe-card-title-bar" />
                <div className="wireframe-card-para-bar" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="wireframe-caption">Schematic architectural blueprint mapping user flows before high-fidelity styling.</p>
    </div>
  )
}

export function AppWireframeVisual() {
  return (
    <div className="wireframe-mockup-wrapper" aria-label="Schematic mobile app wireframe visual">
      <div className="wireframe-mockup-card">
        <div className="wireframe-mockup-badge">MOBILE APP PROTOTYPE WIREFRAME</div>
        {/* Mobile Schematic Frame */}
        <div className="wireframe-mobile-frame">
          {/* Notch & Status */}
          <div className="wireframe-mobile-notch">
            <div className="wireframe-notch-pill" />
          </div>

          <div className="wireframe-mobile-body">
            {/* Header row */}
            <div className="wireframe-mobile-header">
              <div className="wireframe-icon-square" />
              <div className="wireframe-app-title-bar" />
              <div className="wireframe-icon-square" />
            </div>

            {/* Featured Carousel Block */}
            <div className="wireframe-mobile-hero-box">
              <svg width="100%" height="100%" viewBox="0 0 180 80" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="180" y2="80" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="180" y1="0" x2="0" y2="80" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="wireframe-box-label">Interactive Carousel</span>
            </div>

            {/* Quick Actions Row */}
            <div className="wireframe-mobile-actions">
              <div className="wireframe-action-circle" />
              <div className="wireframe-action-circle" />
              <div className="wireframe-action-circle" />
              <div className="wireframe-action-circle" />
            </div>

            {/* Feed Cards */}
            <div className="wireframe-mobile-cards">
              <div className="wireframe-feed-card">
                <div className="wireframe-avatar-circle" />
                <div className="wireframe-feed-lines">
                  <div className="wireframe-feed-title" />
                  <div className="wireframe-feed-sub" />
                </div>
              </div>
              <div className="wireframe-feed-card">
                <div className="wireframe-avatar-circle" />
                <div className="wireframe-feed-lines">
                  <div className="wireframe-feed-title" />
                  <div className="wireframe-feed-sub" />
                </div>
              </div>
            </div>

            {/* Bottom Tab Bar */}
            <div className="wireframe-mobile-tabs">
              <div className="wireframe-tab-icon wireframe-tab-icon--active" />
              <div className="wireframe-tab-icon" />
              <div className="wireframe-tab-icon" />
              <div className="wireframe-tab-icon" />
            </div>
          </div>
        </div>
      </div>
      <p className="wireframe-caption">Touch target ergonomics, screen hierarchies, and gesture patterns mapped at low-fidelity.</p>
    </div>
  )
}

// ===========================================================================
// 3. MOOD BOARD VISUAL (Step 6: Logos / Branding)
// ===========================================================================

export function LogosMoodBoardVisual() {
  return (
    <div className="moodboard-wrapper" aria-label="Brand identity moodboard grid">
      <div className="moodboard-header-chip">CONCEPT EXPLORATION & MOOD BOARD</div>
      <div className="moodboard-grid">
        {/* Tile 1: Color Palette Swatches */}
        <div className="moodboard-tile moodboard-tile--palette">
          <span className="moodboard-tile-tag">CURATED PALETTE</span>
          <div className="moodboard-swatches">
            <div className="moodboard-swatch" style={{ backgroundColor: '#14141A' }}>
              <span>#14141A</span>
            </div>
            <div className="moodboard-swatch" style={{ backgroundColor: '#4F46E5' }}>
              <span>#4F46E5</span>
            </div>
            <div className="moodboard-swatch" style={{ backgroundColor: '#F0EFEA' }}>
              <span>#F0EFEA</span>
            </div>
            <div className="moodboard-swatch" style={{ backgroundColor: '#10B981' }}>
              <span>#10B981</span>
            </div>
          </div>
        </div>

        {/* Tile 2: Typography Specimen */}
        <div className="moodboard-tile moodboard-tile--type">
          <span className="moodboard-tile-tag">TYPOGRAPHY SYSTEM</span>
          <div className="moodboard-type-specimen">
            <span className="moodboard-type-huge">Aa</span>
            <div className="moodboard-type-details">
              <p className="moodboard-type-font">Plus Jakarta Sans</p>
              <p className="moodboard-type-weights">Display 800 • SemiBold 600</p>
            </div>
          </div>
        </div>

        {/* Tile 3: Geometric Mark Exploration */}
        <div className="moodboard-tile moodboard-tile--mark">
          <span className="moodboard-tile-tag">MARK DRAFTING</span>
          <svg viewBox="0 0 100 100" className="moodboard-svg-mark">
            <circle cx="50" cy="50" r="38" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="50,16 80,76 20,76" stroke="#14141A" strokeWidth="2.5" fill="none" />
            <circle cx="50" cy="56" r="14" fill="#4F46E5" opacity="0.15" />
          </svg>
        </div>

        {/* Tile 4: Architectural Editorial Layout */}
        <div className="moodboard-tile moodboard-tile--editorial">
          <span className="moodboard-tile-tag">EDITORIAL RHYTHM</span>
          <div className="moodboard-editorial-art">
            <div className="moodboard-art-block moodboard-art-block--dark" />
            <div className="moodboard-art-block moodboard-art-block--light" />
            <div className="moodboard-art-block moodboard-art-block--accent" />
          </div>
        </div>

        {/* Tile 5: Precision Ratio Study */}
        <div className="moodboard-tile moodboard-tile--ratio">
          <span className="moodboard-tile-tag">PROPORTION</span>
          <div className="moodboard-golden-spiral">
            <div className="golden-rect-1">
              <div className="golden-rect-2">
                <div className="golden-rect-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Tile 6: Material / Tone Texture */}
        <div className="moodboard-tile moodboard-tile--texture">
          <span className="moodboard-tile-tag">TEXTURE & DEPTH</span>
          <div className="moodboard-noise-surface">
            <span className="moodboard-tone-label">Matte Editorial Finish</span>
          </div>
        </div>
      </div>
      <p className="wireframe-caption">Synthesizing design references, typography pairings, and chromatic harmony before vector lockup.</p>
    </div>
  )
}

// ===========================================================================
// 4. ANIMATED MARKETING GROWTH CHART (Step 4: Digital Marketing)
// ===========================================================================

export function MarketingGrowthChart() {
  const prefersReducedMotion = useReducedMotion()

  const MONTHS = [
    { label: 'Mo 1', value: 14, display: '14k' },
    { label: 'Mo 2', value: 24, display: '24k' },
    { label: 'Mo 3', value: 38, display: '38k' },
    { label: 'Mo 4', value: 54, display: '54k' },
    { label: 'Mo 5', value: 76, display: '76k' },
    { label: 'Mo 6', value: 108, display: '108k' },
  ]

  return (
    <div className="marketing-chart-wrapper" aria-label="Organic traffic growth chart">
      <div className="marketing-chart-card">
        {/* Header with KPI badge */}
        <div className="marketing-chart-header">
          <div>
            <h4 className="marketing-chart-title">Organic Traffic Growth</h4>
            <p className="marketing-chart-metric">+671% Total Audience Lift (6-Month Campaign)</p>
          </div>
          <span className="marketing-chart-kpi-badge">SCALABLE PERFORMANCE</span>
        </div>

        {/* Chart SVG Canvas */}
        <div className="marketing-chart-canvas">
          {/* Background Grid Lines */}
          <div className="marketing-chart-grid" aria-hidden="true">
            <div className="marketing-chart-grid-line" />
            <div className="marketing-chart-grid-line" />
            <div className="marketing-chart-grid-line" />
            <div className="marketing-chart-grid-line" />
          </div>

          {/* Bar Chart Columns */}
          <div className="marketing-chart-bars">
            {MONTHS.map((item, index) => {
              const heightPercent = `${item.value}%`
              return (
                <div key={item.label} className="marketing-bar-col">
                  <div className="marketing-bar-track">
                    <motion.div
                      className="marketing-bar-fill"
                      initial={prefersReducedMotion ? { height: heightPercent } : { height: '0%' }}
                      whileInView={{ height: heightPercent }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.6,
                        delay: prefersReducedMotion ? 0 : index * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <span className="marketing-bar-val">{item.display}</span>
                    </motion.div>
                  </div>
                  <span className="marketing-bar-label">{item.label}</span>
                </div>
              )
            })}
          </div>

          {/* Connected Trendline Overlay */}
          <svg className="marketing-trend-svg" viewBox="0 0 540 180" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="mkt-trend-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <motion.path
              d="M 45 155 C 135 140, 225 120, 315 85 C 405 50, 460 25, 495 18 L 495 180 L 45 180 Z"
              fill="url(#mkt-trend-grad)"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* Drawn Curve Line */}
            <motion.path
              d="M 45 155 C 135 140, 225 120, 315 85 C 405 50, 460 25, 495 18"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 0.3,
                ease: 'easeInOut',
              }}
            />
          </svg>
        </div>

        {/* Required Mandatory Caption per Step 4 */}
        <p className="marketing-chart-caption">Illustrative example — results vary by project</p>
      </div>
    </div>
  )
}
