// Design tokens for Retinalinks
// Warm pastel claymorphism design system

export const colors = {
  // Backgrounds
  bg: '#F2EAE1',         // warm cream/beige
  surface: '#FAF6F0',    // soft off-white card surface

  // Accent palette (rotate across cards/icons/blobs)
  peach:    '#F5C6A5',
  lavender: '#C3BFF0',
  mint:     '#A9DCD9',
  pink:     '#F0B8C4',
  butter:   '#F5DDA0',

  // Text
  textDark:    '#3D2B1F',  // warm dark brown
  textMid:     '#6B4F3A',  // warm medium brown
  textLight:   '#9B7B65',  // warm light brown

  // Border / highlight
  clayHighlight: 'rgba(255,255,255,0.6)',
  clayShadow:    'rgba(200,160,130,0.25)',
} as const

export const accents = [
  colors.peach,
  colors.lavender,
  colors.mint,
  colors.pink,
  colors.butter,
] as const

export const nav = {
  links: [
    { label: 'Services', href: '/services' },
    { label: 'Work',     href: '/work'     },
    { label: 'About',    href: '/about'    },
    { label: 'Contact',  href: '/contact'  },
  ],
  cta: { label: 'Get a Quote', href: '/contact' },
} as const

export const siteConfig = {
  name:    'Retinalinks',
  tagline: 'Design. Develop. Deliver.',
  domain:  'retinalinks.com',
} as const
