'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

export function BrandEmblemSection() {
  return (
    <section className="emblem-section" aria-label="Retinalinks Digital Craft">
      {/* Background radial ambient aura */}
      <div className="emblem-ambient-glow" aria-hidden="true" />
      <div className="emblem-grid-lines" aria-hidden="true" />

      <div className="emblem-inner">
        {/* Eyebrow */}
        <div className="emblem-eyebrow-wrap">
          <span className="emblem-eyebrow">THE RETINALINKS STANDARD</span>
        </div>

        {/* Headline */}
        <h2 className="emblem-headline">
          Crafted at the Intersection of Design &amp; Performance
        </h2>

        {/* Central Animated Gyroscope / Orbital Emblem */}
        <div className="emblem-stage" aria-hidden="true">
          {/* Ambient center pulse aura */}
          <div className="emblem-core-aura" />

          {/* Concentric Rotating Orbital Rings */}
          <div className="emblem-orbital-outer">
            <svg
              className="emblem-svg-rings"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="emblem-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="emblem-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14141A" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4338CA" stopOpacity="0.3" />
                </linearGradient>

                <filter id="emblem-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ring 1 — Outermost Stippled Radar Ring */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                style={{ transformOrigin: '160px 160px' }}
              >
                <circle
                  cx="160"
                  cy="160"
                  r="148"
                  stroke="#E8E6E0"
                  strokeWidth="1.25"
                  strokeDasharray="4 8"
                />
              </motion.g>

              {/* Ring 2 — Clockwise Orbital Gradient Ring with Satellite */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                style={{ transformOrigin: '160px 160px' }}
              >
                <circle
                  cx="160"
                  cy="160"
                  r="124"
                  stroke="url(#emblem-grad-1)"
                  strokeWidth="2.5"
                  strokeDasharray="70 40 110 30"
                  strokeLinecap="round"
                />
                {/* Orbital Satellite Node on Ring 2 */}
                <circle cx="284" cy="160" r="5" fill="#4F46E5" />
                <circle cx="284" cy="160" r="8" stroke="#4F46E5" strokeWidth="1.5" strokeOpacity="0.5" />
              </motion.g>

              {/* Ring 3 — Counter-Clockwise Concentric Ring */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                style={{ transformOrigin: '160px 160px' }}
              >
                <circle
                  cx="160"
                  cy="160"
                  r="96"
                  stroke="url(#emblem-grad-2)"
                  strokeWidth="2"
                  strokeDasharray="50 30 80 40"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Ring 4 — Inner Precision Hexagon / Gear */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 44, ease: 'linear' }}
                style={{ transformOrigin: '160px 160px' }}
              >
                <circle
                  cx="160"
                  cy="160"
                  r="70"
                  stroke="#C7D2FE"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              </motion.g>

              {/* Center Core Monogram Aperture */}
              <circle cx="146" cy="160" r="30" stroke="#14141A" strokeWidth="3" fill="#FFFFFF" fillOpacity="0.9" />
              <circle cx="174" cy="160" r="30" stroke="#4F46E5" strokeWidth="3" fill="#FFFFFF" fillOpacity="0.9" />
              <motion.circle
                cx="160"
                cy="160"
                r="9"
                fill="#4F46E5"
                filter="url(#emblem-glow)"
                animate={{ scale: [0.92, 1.1, 0.92] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                style={{ transformOrigin: '160px 160px' }}
              />
              <circle cx="160" cy="160" r="4" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Floating Craft Pill Badges */}
          <div className="emblem-pill emblem-pill-1">
            <span className="emblem-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <span className="emblem-pill-text">Sub-Second Load Times</span>
          </div>

          <div className="emblem-pill emblem-pill-2">
            <span className="emblem-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </span>
            <span className="emblem-pill-text">Pixel-Perfect UI/UX</span>
          </div>

          <div className="emblem-pill emblem-pill-3">
            <span className="emblem-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </span>
            <span className="emblem-pill-text">Engineered for Conversion</span>
          </div>
        </div>

        {/* Subtext description */}
        <p className="emblem-subtext">
          We bridge visual artistry with high-performance engineering — delivering digital
          experiences that captivate users and drive measurable commercial scale.
        </p>
      </div>
    </section>
  )
}
