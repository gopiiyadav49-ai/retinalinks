import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import GlassNav from '@/components/GlassNav'
import Footer from '@/components/Footer'
import Persistent3DBackground from '@/components/Persistent3DBackgroundLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Retinalinks — Digital Agency | Web Design, App & Web App Development',
    template: '%s | Retinalinks',
  },
  description:
    'Retinalinks is a digital agency specialising in web design, app development, and web app development. We build digital products that look great and perform even better.',
  keywords: [
    'digital agency',
    'web design',
    'app development',
    'web app development',
    'UI/UX design',
    'Retinalinks',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Retinalinks',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
      style={{ scrollBehavior: 'smooth' }}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        suppressHydrationWarning
        style={{ fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)' }}
      >
        <Persistent3DBackground />
        <GlassNav />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
