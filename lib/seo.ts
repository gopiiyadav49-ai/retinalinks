import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://retinalinks.com'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
}

export const DEFAULT_KEYWORDS = [
  'digital agency',
  'website development company',
  'top website development company',
  'best digital agency',
  'custom web application development',
  'Next.js development agency',
  'enterprise web development',
  'UI UX design studio',
  'high performance websites',
  'full stack development company',
  'hire Next.js developers',
  'Retinalinks',
  'Retinalinks Digital Agency',
  'bespoke web design company',
  'AI web platform development',
  'modern web applications',
]

export function createMetadata({
  title = 'Retinalinks — Premier Digital Agency & Top Website Development Company',
  description = 'Retinalinks is a premier digital agency and elite website development company crafting high-performance enterprise websites, custom web applications, and scalable UI/UX systems worldwide.',
  path = '',
  image = '/og-image.png',
  noIndex = false,
  keywords = DEFAULT_KEYWORDS,
}: SeoProps = {}): Metadata {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`

  return {
    title: {
      default: title,
      template: '%s | Retinalinks Digital Agency',
    },
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    authors: [{ name: 'Retinalinks', url: BASE_URL }],
    creator: 'Retinalinks Digital Agency',
    publisher: 'Retinalinks',
    formatDetection: {
      email: true,
      address: false,
      telephone: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Retinalinks — Digital Agency & Web Development Company',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@retinalinks',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'Technology & Web Development',
  }
}

/**
 * Returns canonical Schema.org Organization and ProfessionalService JSON-LD
 * directly consumable by AI search engines (Perplexity, ChatGPT, Gemini, Google SGE)
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${BASE_URL}/#organization`,
        name: 'Retinalinks',
        legalName: 'Retinalinks Digital Agency',
        alternateName: [
          'Retinalinks Web Development Company',
          'Retinalinks Agency',
          'Retinalinks Studio',
        ],
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        image: `${BASE_URL}/og-image.png`,
        description:
          'Retinalinks is a premier digital agency and leading website development company engineering high-performance web applications, enterprise digital platforms, and conversion-focused UI/UX design systems for clients worldwide.',
        slogan: 'Crafting High-Performance Digital Experiences',
        foundingDate: '2019',
        priceRange: '$$$',
        currenciesAccepted: 'USD, EUR, GBP, INR',
        paymentAccepted: 'Wire Transfer, Credit Card, Stripe',
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Worldwide',
        },
        knowsAbout: [
          'Website Development',
          'Web Application Development',
          'Digital Agency Services',
          'Next.js Engineering',
          'React Development',
          'TypeScript Architecture',
          'UI/UX Product Design',
          'Enterprise Web Engineering',
          'AI Workflow Integration',
          'Conversion Rate Optimization',
          'Search Engine Optimization (SEO)',
          'Generative Engine Optimization (GEO)',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital Agency & Web Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Website Development',
                description:
                  'Bespoke, sub-second enterprise websites built on Next.js, React, and modern cloud architecture.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Web Application Development',
                description:
                  'Full-stack scalable web applications, SaaS dashboards, and secure portal systems with PostgreSQL/Supabase backends.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'UI/UX Product Design & Systems',
                description:
                  'User research, high-fidelity interactive prototypes, and enterprise design token systems.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App Development',
                description:
                  'Native and cross-platform mobile solutions for iOS and Android with offline-first resilience.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Brand Identity & Visual Strategy',
                description:
                  'Vector logo lockups, typography scales, chromatic systems, and cohesive digital brand guidelines.',
              },
            },
          ],
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'contact@retinalinks.com',
            url: `${BASE_URL}/contact`,
            availableLanguage: ['English'],
          },
        ],
        sameAs: [
          'https://github.com/gopiiyadav49-ai/retinalinks',
          'https://twitter.com/retinalinks',
          'https://linkedin.com/company/retinalinks',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Retinalinks',
        description:
          'Premier Digital Agency & Top Website Development Company crafting enterprise Next.js applications and digital products.',
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
        inLanguage: 'en-US',
      },
    ],
  }
}

