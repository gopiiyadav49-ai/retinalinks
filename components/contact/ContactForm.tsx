'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICE_OPTIONS = [
  { id: 'web-dev', label: 'Web Development', icon: '💻' },
  { id: 'mobile-app', label: 'Mobile App (iOS/Android)', icon: '📱' },
  { id: 'ui-ux', label: 'UI/UX & Prototyping', icon: '🎨' },
  { id: 'branding', label: 'Branding & Identity', icon: '✨' },
  { id: 'saas-app', label: 'Web App / SaaS', icon: '🚀' },
  { id: 'growth-seo', label: 'Growth & Marketing', icon: '📈' },
]

const BUDGET_OPTIONS = [
  { id: 'tier-1', label: '< $10,000' },
  { id: 'tier-2', label: '$10k – $25k' },
  { id: 'tier-3', label: '$25k – $50k' },
  { id: 'tier-4', label: '$50k+' },
]

const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'ASAP (< 1 mo)' },
  { id: '1-3mo', label: '1 – 3 Months' },
  { id: '3-6mo', label: '3 – 6 Months' },
  { id: 'flexible', label: 'Flexible' },
]

export function ContactForm() {
  const [selectedServices, setSelectedServices] = React.useState<string[]>(['web-dev', 'ui-ux'])
  const [selectedBudget, setSelectedBudget] = React.useState<string>('$10k – $25k')
  const [selectedTimeline, setSelectedTimeline] = React.useState<string>('1 – 3 Months')

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    details: '',
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [refId, setRefId] = React.useState('')

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }))
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.'
    }
    if (selectedServices.length === 0) {
      errs.services = 'Please select at least one service category.'
    }
    if (!formData.details.trim() || formData.details.trim().length < 10) {
      errs.details = 'Please describe your project (at least 10 characters).'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate reliable async transmission with feedback
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const generatedId = `RL-${Math.floor(10000 + Math.random() * 90000)}`
    setRefId(generatedId)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', details: '' })
    setSelectedServices(['web-dev', 'ui-ux'])
    setSelectedBudget('$10k – $25k')
    setSelectedTimeline('1 – 3 Months')
    setErrors({})
    setIsSuccess(false)
  }

  return (
    <div className="contact-form-container">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success-card"
            className="contact-success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-success-icon-wrap" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <span className="contact-success-badge">INQUIRY DISPATCHED • {refId}</span>
            <h3 className="contact-success-title">Thank you, {formData.name}!</h3>
            <p className="contact-success-desc">
              We&apos;ve received your project brief. A technical lead will review your requirements and reply to{' '}
              <strong>{formData.email}</strong> within <strong>24 business hours</strong> with a scope analysis and next steps.
            </p>

            <div className="contact-success-summary-box">
              <div className="summary-row">
                <span className="summary-label">Selected Services:</span>
                <span className="summary-val">
                  {selectedServices
                    .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.label)
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Target Budget:</span>
                <span className="summary-val">{selectedBudget}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Target Timeline:</span>
                <span className="summary-val">{selectedTimeline}</span>
              </div>
            </div>

            <div className="contact-success-actions">
              <button
                type="button"
                onClick={handleReset}
                className="contact-reset-btn"
              >
                Send Another Brief
              </button>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cal-btn"
              >
                Schedule Direct Discovery Call →
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="inquiry-form"
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            noValidate
          >
            {/* Dynamic Interactive Scope Preview Bar */}
            <div className="contact-scope-status-bar">
              <div className="scope-status-left">
                <span className="scope-status-indicator" aria-hidden="true" />
                <span className="scope-status-text">
                  <strong>Project Scope Builder</strong> — {selectedServices.length} categories active
                </span>
              </div>
              <div className="scope-status-right">
                <span className="scope-est-tag">Est. Kickoff: ~7 Days</span>
              </div>
            </div>

            {/* Step 1: Select Services */}
            <div className="form-group">
              <label className="form-section-label">
                1. What are you looking to build? <span className="label-req">*</span>
              </label>
              <p className="form-section-hint">Select all categories that apply to your product vision.</p>
              
              <div className="service-chips-grid" role="group" aria-label="Service categories">
                {SERVICE_OPTIONS.map((svc) => {
                  const isChecked = selectedServices.includes(svc.id)
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className={`service-chip ${isChecked ? 'is-selected' : ''}`}
                      aria-pressed={isChecked}
                    >
                      <span className="service-chip-icon" aria-hidden="true">
                        {svc.icon}
                      </span>
                      <span className="service-chip-label">{svc.label}</span>
                      <span className="service-chip-check" aria-hidden="true">
                        {isChecked ? '✓' : '+'}
                      </span>
                    </button>
                  )
                })}
              </div>
              {errors.services && <span className="form-error-msg">{errors.services}</span>}
            </div>

            {/* Step 2: Budget & Timeline Selectors */}
            <div className="form-row-2col">
              <div className="form-group">
                <label className="form-section-label">2. Target Budget</label>
                <div className="budget-pills-grid" role="radiogroup" aria-label="Budget tier">
                  {BUDGET_OPTIONS.map((b) => {
                    const isSelected = selectedBudget === b.label
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBudget(b.label)}
                        className={`budget-pill ${isSelected ? 'is-selected' : ''}`}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        {b.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-section-label">3. Expected Timeline</label>
                <div className="timeline-pills-grid" role="radiogroup" aria-label="Timeline expectation">
                  {TIMELINE_OPTIONS.map((t) => {
                    const isSelected = selectedTimeline === t.label
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTimeline(t.label)}
                        className={`timeline-pill ${isSelected ? 'is-selected' : ''}`}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Contact Inputs */}
            <div className="form-group">
              <label className="form-section-label">4. About You &amp; Your Team</label>
              <div className="form-inputs-grid">
                <div className="input-wrap">
                  <label htmlFor="input-name" className="field-label">
                    Your Name <span className="label-req">*</span>
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    required
                  />
                  {errors.name && <span className="form-error-msg">{errors.name}</span>}
                </div>

                <div className="input-wrap">
                  <label htmlFor="input-email" className="field-label">
                    Work Email <span className="label-req">*</span>
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@company.com"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    required
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                <div className="input-wrap full-width">
                  <label htmlFor="input-company" className="field-label">
                    Company Name / Existing Website <span className="label-opt">(Optional)</span>
                  </label>
                  <input
                    id="input-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Corp or acme.com"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Project Scope Details */}
            <div className="form-group">
              <div className="details-header-row">
                <label htmlFor="input-details" className="form-section-label">
                  5. Project Details &amp; Objectives <span className="label-req">*</span>
                </label>
                <span className="char-counter">
                  {formData.details.length} chars
                </span>
              </div>
              <p className="form-section-hint">
                Briefly share what you are solving, target audiences, key features, or any links to inspiration.
              </p>
              <textarea
                id="input-details"
                name="details"
                rows={4}
                value={formData.details}
                onChange={handleInputChange}
                placeholder="e.g. We are revamping our core SaaS platform with Next.js and need an ultra-fast, premium UI with 3D interactive visualizations and design system overhaul..."
                className={`form-textarea ${errors.details ? 'input-error' : ''}`}
                required
              />
              {errors.details && <span className="form-error-msg">{errors.details}</span>}
            </div>

            {/* Submit Action */}
            <div className="form-submit-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
                id="btn-submit-inquiry"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-dots" aria-hidden="true" />
                    <span>Transmitting Project Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <div className="submit-disclaimer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Zero spam guarantee. We respect your privacy &amp; sign mutual NDAs.</span>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
