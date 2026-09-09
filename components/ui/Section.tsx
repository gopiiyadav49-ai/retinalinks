import * as React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = 'section', ...props }, ref) => {
    const Comp = Component as any
    return (
      <Comp
        ref={ref}
        className={cn('relative py-16 sm:py-24 lg:py-28 overflow-hidden', className)}
        {...props}
      />
    )
  }
)

Section.displayName = 'Section'
