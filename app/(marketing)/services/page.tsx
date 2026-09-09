import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { createMetadata } from '@/lib/seo'
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection'
import { ServicesSubNav } from '@/components/services/ServicesSubNav'
import { ProcessDiagram } from '@/components/services/ProcessDiagram'
import {
  WebsiteIntroGraphic,
  AppIntroGraphic,
  LogosIntroGraphic,
  MarketingIntroGraphic,
  WebsiteWireframeVisual,
  AppWireframeVisual,
  LogosMoodBoardVisual,
  MarketingGrowthChart,
} from '@/components/services/ServiceVisuals'

export const metadata: Metadata = createMetadata({
  title: 'Our Services — Retinalinks',
  description: "From first sketch to shipped product — here's exactly how we work.",
  path: '/services',
})

// Exact process steps defined in specification
const WEBSITE_PROCESS_STEPS = [
  'Discovery & Requirements',
  'Wireframing',
  'UI/UX Design',
  'Development',
  'Testing & QA',
  'Deployment',
  'Ongoing Support',
]

const APP_PROCESS_STEPS = [
  'Requirement Analysis',
  'Wireframing & Prototyping',
  'UI/UX Design',
  'Development (iOS/Android)',
  'QA & Testing',
  'App Store Deployment',
  'Maintenance & Updates',
]

const LOGOS_PROCESS_STEPS = [
  'Discovery & Research',
  'Concept Sketching',
  'Digital Refinement',
  'Client Feedback & Iteration',
  'Final Delivery & Brand Guidelines',
]

const MARKETING_PROCESS_STEPS = [
  'Audit & Analysis',
  'Strategy Development',
  'Campaign Execution',
  'Performance Monitoring',
  'Reporting & Optimization',
]

export default function ServicesPage() {
  return (
    <div className="services-page-root">
      {/* STEP 1 — PAGE HEADER */}
      <header className="services-hero-header">
        <Container>
          <h1 className="services-hero-title">Our Services</h1>
          <p className="services-hero-subtext">
            From first sketch to shipped product — here&apos;s exactly how we work.
          </p>
        </Container>
      </header>

      {/* STICKY SUB-NAVIGATION BAR */}
      <ServicesSubNav />

      {/* STEP 2 & 3 — 4 MAJOR SERVICE SECTIONS */}
      <main id="main-content">
        {/* ================================================================= */}
        {/* 1. WEBSITE DEVELOPMENT (Graphic on Right) */}
        {/* ================================================================= */}
        <section
          id="website-development"
          className="service-section-wrap"
          aria-labelledby="heading-website-development"
        >
          <Container>
            {/* Intro Block (alternating layout: graphic on right) */}
            <div className="service-intro-grid">
              <div className="service-intro-content">
                <span className="service-intro-eyebrow">Digital Engineering</span>
                <h2 id="heading-website-development" className="service-intro-title">
                  Website Development
                </h2>
                <p className="service-intro-description">
                  We engineer bespoke, high-performance web applications and digital platforms engineered for conversion, speed, and uncompromising aesthetic clarity. From accessible user interfaces to robust server architectures, every build is crafted to scale seamlessly.
                </p>
              </div>
              <WebsiteIntroGraphic />
            </div>

            {/* "Our Process" Sub-Section */}
            <div className="service-process-wrapper">
              <div className="service-process-header">
                <div className="service-process-label">Systematic Methodology</div>
                <h3 className="service-process-heading">Our Website Development Process</h3>
                <p className="service-process-subheading">
                  A structured, transparent engineering pipeline that ensures predictability, code quality, and on-time delivery across every sprint.
                </p>
              </div>

              {/* Animated Process Diagram (7 steps) */}
              <ProcessDiagram steps={WEBSITE_PROCESS_STEPS} serviceTheme="indigo" />

              {/* Supporting Visual: Desktop Low-Fidelity Schematic Wireframe */}
              <div className="service-supporting-visual-block">
                <WebsiteWireframeVisual />
              </div>
            </div>
          </Container>
        </section>

        {/* ================================================================= */}
        {/* 2. APP DEVELOPMENT (Graphic on Left - Alternating Layout) */}
        {/* ================================================================= */}
        <section
          id="app-development"
          className="service-section-wrap"
          aria-labelledby="heading-app-development"
        >
          <Container>
            {/* Intro Block (alternating layout: graphic on left) */}
            <div className="service-intro-grid service-intro-grid--reverse">
              <div className="service-intro-content">
                <span className="service-intro-eyebrow">Mobile Ecosystems</span>
                <h2 id="heading-app-development" className="service-intro-title">
                  App Development
                </h2>
                <p className="service-intro-description">
                  Native and cross-platform mobile solutions tailored for iOS and Android with fluid interactions and offline-first resilience. We architect intuitive mobile experiences that keep your users engaged, productive, and delighted across every touchpoint.
                </p>
              </div>
              <AppIntroGraphic />
            </div>

            {/* "Our Process" Sub-Section */}
            <div className="service-process-wrapper">
              <div className="service-process-header">
                <div className="service-process-label">Mobile Lifecycle</div>
                <h3 className="service-process-heading">Our App Development Process</h3>
                <p className="service-process-subheading">
                  From ergonomic touch patterns and interface prototyping to rigorous device testing and flawless App Store releases.
                </p>
              </div>

              {/* Animated Process Diagram (7 steps) */}
              <ProcessDiagram steps={APP_PROCESS_STEPS} serviceTheme="cyan" />

              {/* Supporting Visual: Mobile Low-Fidelity Schematic Wireframe */}
              <div className="service-supporting-visual-block">
                <AppWireframeVisual />
              </div>
            </div>
          </Container>
        </section>

        {/* ================================================================= */}
        {/* 3. LOGOS & BRAND IDENTITY (Graphic on Right) */}
        {/* ================================================================= */}
        <section
          id="logos"
          className="service-section-wrap"
          aria-labelledby="heading-logos"
        >
          <Container>
            {/* Intro Block (alternating layout: graphic on right) */}
            <div className="service-intro-grid">
              <div className="service-intro-content">
                <span className="service-intro-eyebrow">Visual Systems</span>
                <h2 id="heading-logos" className="service-intro-title">
                  Logos &amp; Brand Identity
                </h2>
                <p className="service-intro-description">
                  Memorable visual identities built on deep brand strategy, enduring design principles, and comprehensive design systems. We deliver complete vector lockups, typographic guidelines, and chromatic palettes engineered for maximum brand resonance.
                </p>
              </div>
              <LogosIntroGraphic />
            </div>

            {/* "Our Process" Sub-Section */}
            <div className="service-process-wrapper">
              <div className="service-process-header">
                <div className="service-process-label">Identity Craft</div>
                <h3 className="service-process-heading">Our Logo Design Process</h3>
                <p className="service-process-subheading">
                  Iterative concept drafting grounded in market positioning, geometric precision, and scalable design token specifications.
                </p>
              </div>

              {/* Animated Process Diagram (5 steps) */}
              <ProcessDiagram steps={LOGOS_PROCESS_STEPS} serviceTheme="violet" />

              {/* Supporting Visual: 6-Tile Concept Mood Board */}
              <div className="service-supporting-visual-block">
                <LogosMoodBoardVisual />
              </div>
            </div>
          </Container>
        </section>

        {/* ================================================================= */}
        {/* 4. DIGITAL MARKETING (Graphic on Left - Alternating Layout) */}
        {/* ================================================================= */}
        <section
          id="digital-marketing"
          className="service-section-wrap"
          aria-labelledby="heading-digital-marketing"
        >
          <Container>
            {/* Intro Block (alternating layout: graphic on left) */}
            <div className="service-intro-grid service-intro-grid--reverse">
              <div className="service-intro-content">
                <span className="service-intro-eyebrow">Growth Acceleration</span>
                <h2 id="heading-digital-marketing" className="service-intro-title">
                  Digital Marketing
                </h2>
                <p className="service-intro-description">
                  Data-informed growth strategies combining precision search optimization, conversion rate mastery, and multi-channel acquisition funnels. We measure every dollar against measurable pipeline growth and verifiable customer lifetime value.
                </p>
              </div>
              <MarketingIntroGraphic />
            </div>

            {/* "Our Process" Sub-Section */}
            <div className="service-process-wrapper">
              <div className="service-process-header">
                <div className="service-process-label">Data-Driven Execution</div>
                <h3 className="service-process-heading">Our Digital Marketing Process</h3>
                <p className="service-process-subheading">
                  Rigorous audits followed by targeted campaign launches, live performance telemetry, and compounding conversion gains.
                </p>
              </div>

              {/* Animated Process Diagram (5 steps) */}
              <ProcessDiagram steps={MARKETING_PROCESS_STEPS} serviceTheme="emerald" />

              {/* Supporting Visual: Animated Marketing Growth Chart */}
              <div className="service-supporting-visual-block">
                <MarketingGrowthChart />
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* STEP 7 — REUSE EXISTING CLOSING CTA SECTION */}
      <ClosingCtaSection />
    </div>
  )
}
