export const tokens = {
  colors: {
    background: '#FAFAF7',
    foreground: '#14141A',
    accent: {
      DEFAULT: '#4F46E5',
      hover: '#4338CA',
      muted: '#EEF2FF',
    },
    neutral: {
      50: '#FAF9F6',
      100: '#F4F2ED',
      200: '#E8E6E0',
      300: '#D8D5CC',
      400: '#A3A099',
      500: '#73706B',
      600: '#524F4B',
      700: '#3D3B38',
      800: '#262523',
      900: '#14141A',
    },
    border: '#E8E6E0',
  },
  fonts: {
    sans: 'var(--font-sans)',
    display: 'var(--font-display)',
  },
  radii: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
} as const

export type Tokens = typeof tokens
