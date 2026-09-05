'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollTriggerReveals() {
  useEffect(() => {
    // 1. Services section header
    const servicesHeader = document.querySelector('#services-header')
    if (servicesHeader) {
      gsap.fromTo(
        servicesHeader,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesHeader,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    // 2. Work section header & cards
    const workHeader = document.querySelector('#work-header')
    if (workHeader) {
      gsap.fromTo(
        workHeader,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: workHeader,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    const workCards = document.querySelectorAll('.work-card-item')
    if (workCards.length > 0) {
      gsap.fromTo(
        workCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#work',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    // 3. CTA / Contact section card
    const contactCard = document.querySelector('#contact-card')
    if (contactCard) {
      gsap.fromTo(
        contactCard,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    // 4. Any generic .gsap-reveal items
    const genericReveals = document.querySelectorAll('.gsap-reveal')
    genericReveals.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })
  }, [])

  return null
}
