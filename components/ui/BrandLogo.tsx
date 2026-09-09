'use client'

import * as React from 'react'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'navbar' | 'footer' | 'emblem' | 'standalone'
  showText?: boolean
  animated?: boolean
  className?: string
}

export function BrandLogo({
  size = 'md',
  variant = 'standalone',
  showText = true,
  animated = true,
  className = '',
}: BrandLogoProps) {
  // Dimensions based on size prop
  const iconDimensions = {
    sm: { width: 28, height: 28, stroke: 2 },
    md: { width: 34, height: 34, stroke: 2.2 },
    lg: { width: 64, height: 64, stroke: 2.5 },
    xl: { width: 108, height: 108, stroke: 3 },
  }[size]

  const textClasses = {
    sm: 'brand-logo-text--sm',
    md: 'brand-logo-text--md',
    lg: 'brand-logo-text--lg',
    xl: 'brand-logo-text--xl',
  }[size]

  return (
    <div
      className={`brand-logo-root brand-logo-root--${size} brand-logo-root--${variant} ${
        animated ? 'brand-logo--animated' : ''
      } ${className}`}
    >
      {/* Animated SVG Icon */}
      <div className="brand-logo-icon-wrap" aria-hidden="true">
        <svg
          width={iconDimensions.width}
          height={iconDimensions.height}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="brand-logo-svg"
        >
          <defs>
            <linearGradient id="brand-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>

            <linearGradient id="brand-grad-secondary" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14141A" />
              <stop offset="60%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>

            <filter id="brand-core-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Orbital Rotating Ring */}
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="url(#brand-grad-primary)"
            strokeWidth={iconDimensions.stroke * 0.75}
            strokeDasharray="18 10"
            strokeLinecap="round"
            className="brand-logo-orbital-ring"
            opacity="0.85"
          />

          {/* Left Retina Eye / Aperture Ring */}
          <circle
            cx="13.5"
            cy="18"
            r="8.5"
            stroke="currentColor"
            strokeWidth={iconDimensions.stroke}
            className="brand-logo-ring-left"
          />

          {/* Right Links Aperture Ring */}
          <circle
            cx="22.5"
            cy="18"
            r="8.5"
            stroke="url(#brand-grad-primary)"
            strokeWidth={iconDimensions.stroke}
            className="brand-logo-ring-right"
          />

          {/* Central Pulsing Focal Node */}
          <circle
            cx="18"
            cy="18"
            r="3"
            fill="#4F46E5"
            filter="url(#brand-core-glow)"
            className="brand-logo-core-pulse"
          />
          <circle
            cx="18"
            cy="18"
            r="1.5"
            fill="#FFFFFF"
            className="brand-logo-core-center"
          />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <span className={`brand-logo-text ${textClasses}`}>
          Retinalinks
        </span>
      )}
    </div>
  )
}
