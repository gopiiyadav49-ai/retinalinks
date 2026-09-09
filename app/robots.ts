import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://retinalinks.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/auth/', '/admin/'],
      },
      // Explicit rules for AI Search Engines & LLM Crawlers
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Googlebot',
          'Bingbot',
          'Applebot',
          'Applebot-Extended',
          'cohere-ai',
          'Bytespider',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/auth/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
