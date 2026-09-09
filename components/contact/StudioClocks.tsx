'use client'

import * as React from 'react'

interface StudioTime {
  city: string
  region: string
  timezone: string
  hours: string
  minutes: string
  ampm: string
  isOpen: boolean
}

const STUDIOS = [
  { city: 'San Francisco', region: 'Americas (PST)', timezone: 'America/Los_Angeles' },
  { city: 'London', region: 'Europe (GMT)', timezone: 'Europe/London' },
  { city: 'Singapore', region: 'Asia-Pacific (SGT)', timezone: 'Asia/Singapore' },
]

function computeStudioTimes(): StudioTime[] {
  const now = new Date()
  return STUDIOS.map((s) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: s.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).formatToParts(now)

      const hours = parts.find((p) => p.type === 'hour')?.value || '--'
      const minutes = parts.find((p) => p.type === 'minute')?.value || '--'
      const ampm = parts.find((p) => p.type === 'dayPeriod')?.value || ''

      const hour24 = parseInt(
        now.toLocaleTimeString('en-US', {
          timeZone: s.timezone,
          hour: 'numeric',
          hour12: false,
        }),
        10
      )
      const isOpen = hour24 >= 9 && hour24 < 18

      return {
        city: s.city,
        region: s.region,
        timezone: s.timezone,
        hours,
        minutes,
        ampm: ampm || '',
        isOpen,
      }
    } catch {
      return {
        city: s.city,
        region: s.region,
        timezone: s.timezone,
        hours: '10',
        minutes: '00',
        ampm: 'AM',
        isOpen: true,
      }
    }
  })
}

const emptySubscribe = () => () => {}

export function StudioClocks() {
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false)
  const [times, setTimes] = React.useState<StudioTime[]>(computeStudioTimes)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimes(computeStudioTimes())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="contact-clocks-skeleton" aria-hidden="true">
        <div className="contact-clock-item-placeholder" />
        <div className="contact-clock-item-placeholder" />
        <div className="contact-clock-item-placeholder" />
      </div>
    )
  }

  return (
    <div className="contact-clocks-wrap" aria-label="Global Studio Timezones">
      <div className="contact-clocks-header">
        <span className="contact-clocks-title">Global Studio Corridors</span>
        <span className="contact-clocks-subtitle">Live real-time local hours</span>
      </div>

      <div className="contact-clocks-grid">
        {times.map((studio) => (
          <div key={studio.city} className="contact-clock-item">
            <div className="contact-clock-info">
              <div className="contact-clock-city-row">
                <span className="contact-clock-city">{studio.city}</span>
                <span
                  className={`contact-clock-status-badge ${
                    studio.isOpen ? 'status-open' : 'status-closed'
                  }`}
                >
                  <span className="status-dot" />
                  {studio.isOpen ? 'Studio Active' : 'After Hours'}
                </span>
              </div>
              <span className="contact-clock-region">{studio.region}</span>
            </div>

            <div className="contact-clock-time" aria-label={`Current time in ${studio.city}`}>
              <span className="clock-digits">
                {studio.hours}:{studio.minutes}
              </span>
              <span className="clock-ampm">{studio.ampm}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
