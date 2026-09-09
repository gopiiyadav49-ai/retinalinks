import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://retinalinks.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/llms.txt', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/llms-full.txt', priority: 0.7, changeFrequency: 'weekly' as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  return routes
}
