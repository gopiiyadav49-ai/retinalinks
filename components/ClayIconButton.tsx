'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type AccentColor = 'peach' | 'lavender' | 'mint' | 'pink' | 'butter'

interface ClayIconButtonProps {
  children:  ReactNode
  accent?:   AccentColor
  size?:     number   // px
  className?: string
  onClick?:  () => void
}

const shadowMap: Record<AccentColor, string> = {
  peach:    'var(--shadow-clay-icon-peach)',
  lavender: 'var(--shadow-clay-icon-lavender)',
  mint:     'var(--shadow-clay-icon-mint)',
  pink:     'var(--shadow-clay-icon-pink)',
  butter:   'var(--shadow-clay-icon-butter)',
}

const bgMap: Record<AccentColor, string> = {
  peach:    'var(--color-peach)',
  lavender: 'var(--color-lavender)',
  mint:     'var(--color-mint)',
  pink:     'var(--color-pink)',
  butter:   'var(--color-butter)',
}

export default function ClayIconButton({
  children,
  accent = 'peach',
  size   = 56,
  className = '',
  onClick,
}: ClayIconButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`clay-icon clay-icon-${accent} ${className}`}
      style={{
        width:      size,
        height:     size,
        background: bgMap[accent],
        boxShadow:  shadowMap[accent],
        border: 'none',
        cursor: onClick ? 'pointer' : 'default',
      }}
      whileTap={{
        scale: 0.92,
        boxShadow: `
          inset 1px 1px 4px rgba(255,255,255,0.4),
          inset -1px -1px 4px rgba(0,0,0,0.12),
          0 2px 6px rgba(0,0,0,0.1)
        `,
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}

// Also export a non-interactive display variant
export function ClayIconDisplay({
  children,
  accent = 'peach',
  size   = 56,
  className = '',
}: Omit<ClayIconButtonProps, 'onClick'>) {
  return (
    <motion.div
      className={`clay-icon clay-icon-${accent} ${className}`}
      style={{
        width:      size,
        height:     size,
        background: bgMap[accent],
        boxShadow:  shadowMap[accent],
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
