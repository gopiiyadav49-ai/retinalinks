'use client'

import * as React from 'react'

export interface FaqItem {
  id: number
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

/**
 * FAQ accordion.
 *
 * Each item can be independently expanded or collapsed.
 * Answer text is ALWAYS present in the DOM (visibility: hidden / height-clamp
 * technique) so it remains crawlable by search engines and is never unmounted.
 *
 * Keyboard: Enter / Space on the trigger button toggles the item.
 * Respects prefers-reduced-motion: the height animation is disabled via the
 * CSS media query on .faq-answer-inner.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = React.useState<number | null>(null)

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <dl className="faq-list">
      {items.map((item) => {
        const isOpen = openId === item.id
        const triggerId = `faq-trigger-${item.id}`
        const panelId = `faq-panel-${item.id}`

        return (
          <div
            key={item.id}
            className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
          >
            {/* Question — <dt> with a button for keyboard/screen-reader support */}
            <dt className="faq-question-wrap">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="faq-trigger"
                onClick={() => toggle(item.id)}
              >
                <span className="faq-question-text">{item.question}</span>
                {/* Chevron icon — rotates when open */}
                <span className="faq-chevron" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 6.75L9 11.25L13.5 6.75"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </dt>

            {/*
             * Answer — <dd> is always in the DOM.
             * Height animates between 0 (collapsed) and auto (expanded)
             * via CSS grid trick: grid-template-rows: 0fr / 1fr.
             * The inner div has overflow:hidden so content is clipped when
             * collapsed but never unmounted — remains crawlable.
             */}
            <dd
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="faq-answer"
              hidden={false} /* never hidden — always in DOM */
            >
              <div className="faq-answer-inner">
                <p className="faq-answer-text">{item.answer}</p>
              </div>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
