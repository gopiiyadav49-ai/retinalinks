import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ─── Compiler optimizations ────────────────────────────────────────────────
  compiler: {
    // Remove console.log in production (keeps console.error/warn)
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // ─── Image optimization ────────────────────────────────────────────────────
  images: {
    // Serve modern formats: AVIF (smallest) → WebP → original
    formats: ['image/avif', 'image/webp'],
    // Reduce re-processing latency by caching optimized images for 1 week
    minimumCacheTTL: 604800,
    // Devices to pre-generate optimized widths for
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow any HTTPS image source used in the project
    remotePatterns: [],
  },

  // ─── Experimental speed features ───────────────────────────────────────────
  experimental: {
    // Pre-connect to Google Fonts earlier to reduce font load latency
    optimizePackageImports: ['framer-motion', 'next-auth'],
  },

  // ─── HTTP Response Headers ─────────────────────────────────────────────────
  // NOTE: Vercel automatically sets Cache-Control: immutable on /_next/static/*
  // so we do NOT override that here — overriding it causes a build warning.
  async headers() {
    return [
      {
        // Cache public files (images, llms.txt, etc.) for 1 week
        source: '/(:path*\\.(?:jpg|jpeg|png|svg|webp|avif|ico|woff2|woff|ttf|txt))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        // HTML pages: always fresh at edge, serve stale while revalidating
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=600' },
          // Security headers — no runtime cost
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
