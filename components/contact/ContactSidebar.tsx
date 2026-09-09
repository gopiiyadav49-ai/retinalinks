'use client'

import * as React from 'react'
import { StudioClocks } from './StudioClocks'

export function ContactSidebar() {
  const [copied, setCopied] = React.useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@retinalinks.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <aside className="contact-sidebar" aria-label="Direct Contact & Studio Details">
      {/* Card 1: Direct Email & Instant Copy */}
      <div className="contact-info-card">
        <div className="contact-info-card-header">
          <div className="contact-info-icon-badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div>
            <span className="contact-info-label">DIRECT EMAIL INQUIRIES</span>
            <h3 className="contact-info-title">Drop us a line</h3>
          </div>
        </div>

        <div className="contact-email-box">
          <a
            href="mailto:hello@retinalinks.com"
            className="contact-email-link"
            aria-label="Send email to hello@retinalinks.com"
          >
            hello@retinalinks.com
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="contact-copy-btn"
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <p className="contact-email-note">
          Have an urgent request or preferred RFP document? Email us directly and our technical partners will review it.
        </p>
      </div>

      {/* Card 2: Discovery Call Option */}
      <div className="contact-info-card contact-discovery-card">
        <div className="contact-info-card-header">
          <div className="contact-info-icon-badge calendar-badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <span className="contact-info-label">DISCOVERY CALL</span>
            <h3 className="contact-info-title">Schedule 20-Min Intro</h3>
          </div>
        </div>

        <p className="contact-discovery-desc">
          Prefer to talk through your product vision live? Pick a time slot that suits your schedule.
        </p>

        <a
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-discovery-btn"
          id="btn-book-discovery"
        >
          <span>Book Discovery Call</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>

      {/* Card 3: Live Studio Clocks */}
      <StudioClocks />

      {/* Card 4: Agency SLA & Trust Badges */}
      <div className="contact-sla-strip">
        <div className="contact-sla-item">
          <div className="sla-icon-wrap" aria-hidden="true">⚡</div>
          <div className="sla-text">
            <strong>&lt; 2-Hour Response Time</strong>
            <span>During active studio corridors</span>
          </div>
        </div>

        <div className="contact-sla-item">
          <div className="sla-icon-wrap" aria-hidden="true">🔒</div>
          <div className="sla-text">
            <strong>Mutual NDA Standard</strong>
            <span>Your IP and project ideas are 100% confidential</span>
          </div>
        </div>

        <div className="contact-sla-item">
          <div className="sla-icon-wrap" aria-hidden="true">🎯</div>
          <div className="sla-text">
            <strong>Clear Fixed-Scope Pricing</strong>
            <span>Transparent budgets with zero surprise fees</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
