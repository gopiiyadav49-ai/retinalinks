import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'A look at some of the products Retinalinks has designed and built.',
}

export default function WorkPage() {
  return (
    <div style={{ paddingTop: '8rem', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--color-text-mid)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
        Work / Portfolio page — coming next ✦
      </p>
    </div>
  )
}
