import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: "We're Retinalinks — a digital agency focused on building websites, apps, and web platforms that work hard.",
}

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '8rem', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--color-text-mid)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
        About page — coming next ✦
      </p>
    </div>
  )
}
