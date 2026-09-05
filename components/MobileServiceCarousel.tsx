'use client'

import React from 'react'
import { PanelData } from '@/lib/dioramaData'

interface MobileServiceCarouselProps {
  panels: PanelData[]
  onSelectPanel?: (index: number) => void
  activeIndex?: number
}

export default function MobileServiceCarousel({
  panels,
  onSelectPanel,
  activeIndex = 0,
}: MobileServiceCarouselProps) {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '1.5rem',
      }}
    >
      {/* Swipeable flex row with scroll snap */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '0.875rem',
          padding: '0.5rem 0.25rem 1rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="no-scrollbar"
      >
        {panels.map((panel, idx) => {
          const isActive = idx === activeIndex
          return (
            <div
              key={panel.id}
              onClick={() => onSelectPanel?.(idx)}
              style={{
                flex: '0 0 min(200px, 60vw)',
                scrollSnapAlign: 'start',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(16px)',
                border: isActive
                  ? `2px solid ${panel.color}`
                  : '1px solid rgba(255, 255, 255, 0.8)',
                padding: '1.25rem 1rem',
                boxShadow: isActive
                  ? `0 8px 24px rgba(200, 160, 130, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.9)`
                  : '0 4px 16px rgba(200, 160, 130, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '110px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Color accent pill indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: panel.color,
                    boxShadow: `0 0 8px ${panel.color}`,
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#8A7365',
                  }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Image preview thumbnail */}
              <div
                style={{
                  width: '100%',
                  height: '100px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={panel.image}
                  alt={panel.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Label */}
              <h3
                style={{
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#2C2C2A',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {panel.label}
              </h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
