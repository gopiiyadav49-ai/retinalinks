'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ClayCardProps {
  children:   ReactNode
  className?: string
  style?:     React.CSSProperties
  hover?:     boolean   // enable lift-on-hover
  padding?:   string    // tailwind or custom
  radius?:    'sm' | 'md' | 'lg' | 'xl'
}

const radiusMap = {
  sm: 'var(--radius-clay-sm)',
  md: 'var(--radius-clay)',
  lg: 'var(--radius-clay-lg)',
  xl: 'var(--radius-clay-xl)',
}

export default function ClayCard({
  children,
  className = '',
  style,
  hover = false,
  radius = 'md',
}: ClayCardProps) {
  return (
    <motion.div
      className={`clay-card ${className}`}
      style={{
        borderRadius: radiusMap[radius],
        ...style,
      }}
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.015,
              boxShadow:
                '0 36px 60px rgba(200,160,130,0.32), 0 10px 24px rgba(200,160,130,0.18)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  )
}
