import * as React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    const Comp = Component as any
    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-[var(--radius-xl)] border border-border bg-white p-6 sm:p-8 shadow-[0_2px_8px_rgba(20,20,26,0.04)] transition-shadow duration-200',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'
