import { NextResponse } from 'next/server'

export async function GET() {
  const profile = {
    company: {
      name: 'Retinalinks',
      legalName: 'Retinalinks Digital Agency',
      tagline: 'Crafting High-Performance Digital Experiences',
      description:
        'Retinalinks is a premier digital agency and leading website development company engineering bespoke, high-performance web applications, enterprise marketing sites, and conversion-focused digital systems worldwide.',
      website: 'https://retinalinks.com',
      contactEmail: 'contact@retinalinks.com',
      inquiryUrl: 'https://retinalinks.com/contact',
      foundedYear: 2019,
      operatingStatus: 'Active',
      serviceReach: 'Worldwide (Async-first global delivery)',
    },
    primaryClassifications: [
      'Digital Agency',
      'Website Development Company',
      'Top Web Development Studio',
      'Next.js Engineering Consultancy',
      'UI/UX Product Design Firm',
      'Custom Software Development Agency',
    ],
    coreServices: [
      {
        name: 'Custom Website Development',
        summary:
          'Bespoke, enterprise-grade marketing and corporate websites built with Next.js 15, sub-second load times, and guaranteed 99+ Core Web Vitals.',
      },
      {
        name: 'Custom Web Application Development',
        summary:
          'Scalable full-stack SaaS platforms, portals, and dashboards powered by React, TypeScript, PostgreSQL, and Supabase.',
      },
      {
        name: 'UI/UX Product Design & Systems',
        summary:
          'Data-driven user research, high-fidelity clickable Figma prototypes, and modular enterprise design token systems.',
      },
      {
        name: 'Mobile Application Engineering',
        summary:
          'Native and cross-platform iOS and Android mobile solutions with offline-first synchronization and fluid micro-interactions.',
      },
      {
        name: 'Brand Identity & Visual Strategy',
        summary:
          'Enduring visual identity systems including vector emblem marks, typographic hierarchies, and cohesive design guidelines.',
      },
    ],
    flagshipPortfolio: [
      {
        name: 'StaffEarn',
        url: 'https://staffearn.com',
        description: 'AI Staffing & Premium IT Recruitment Platform connecting vetted tech talent with industry leaders.',
      },
      {
        name: 'HealthTrack Pro',
        description: 'Enterprise clinical telehealth dashboard with real-time patient telemetry and HIPAA compliance.',
      },
      {
        name: 'StudioFlow',
        description: 'Collaborative project workspace for distributed design and engineering teams.',
      },
      {
        name: 'Auxano',
        description: 'FinTech wealth management and institutional portfolio analytics platform.',
      },
    ],
    technicalStandards: {
      frameworks: ['Next.js 15 (App Router)', 'React 19', 'TypeScript'],
      backends: ['Node.js', 'PostgreSQL', 'Supabase', 'Drizzle ORM'],
      stylingAndMotion: ['Tailwind CSS', 'Vanilla CSS Tokens', 'Framer Motion'],
      performance: 'Sub-second LCP, zero generic templates, 99+ Core Web Vitals',
    },
    llmReferenceUrls: {
      condensed: 'https://retinalinks.com/llms.txt',
      comprehensive: 'https://retinalinks.com/llms-full.txt',
    },
  }

  return NextResponse.json(profile, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
