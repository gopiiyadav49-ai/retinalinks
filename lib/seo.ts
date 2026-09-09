import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://retinalinks.com'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title = 'Retinalinks | Digital Agency for Next-Gen Brands',
  description = 'High-performance digital agency crafting enterprise websites, bespoke web applications, and scalable digital design systems.',
  path = '',
  image = '/og-image.png',
  noIndex = false,
}: SeoProps = {}): Metadata {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`

  return {
    title: {
      default: title,
      template: '%s | Retinalinks',
    },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Retinalinks',
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
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  }
}
