import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { createMetadata, generateOrganizationJsonLd } from '@/lib/seo'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

// Lazy-load the particle canvas — it runs entirely client-side after first paint.
// Using ssr:false prevents a hydration mismatch and avoids blocking HTML delivery.
const GlobalAmbientBackground = dynamic(
  () => import('@/components/ui/GlobalAmbientBackground').then((m) => m.GlobalAmbientBackground),
  { ssr: false }
)

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

export const viewport: Viewport = {
  themeColor: '#FAFAF7',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = generateOrganizationJsonLd()

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Schema.org Organization & ProfessionalService JSON-LD for AI Search & Knowledge Graphs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white relative">
        <GlobalAmbientBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
