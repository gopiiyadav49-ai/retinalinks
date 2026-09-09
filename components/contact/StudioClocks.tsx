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

export function StudioClocks() {
  const [mounted, setMounted] = React.useState(false)
  const [times, setTimes] = React.useState<StudioTime[]>([])

  const updateTimes = React.useCallback(() => {
    const now = new Date()
    const computed: StudioTime[] = STUDIOS.map((s) => {
      try {
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: s.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        const [timePart, ampm] = timeStr.split(' ')
        const [hours, minutes] = timePart.split(':')
        
        // Compute 24-hour hour to check studio open status (09:00 - 18:00)
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
    setTimes(computed)
  }, [])

  React.useEffect(() => {
    setMounted(true)
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [updateTimes])

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
