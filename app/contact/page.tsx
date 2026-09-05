import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's talk about your project. Retinalinks will get back to you within 24 hours.",
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '8rem', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--color-text-mid)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
        Contact page — coming next ✦
      </p>
    </div>
  )
}
