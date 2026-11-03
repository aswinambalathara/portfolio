import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

// Monospace micro-label above a section, e.g. "// featured work" (PRD §9).
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mb-4 font-mono text-sm text-muted-foreground', className)}>
      {'// '}
      {children}
    </p>
  )
}

// Section padding is 64px on mobile and 96px on desktop, inside the 1100px container.
export function Section({
  label,
  className,
  children,
  ...props
}: ComponentProps<'section'> & { label?: string }) {
  return (
    <section className={cn('py-16 md:py-24', className)} {...props}>
      <div className="container-page">
        {label && <SectionLabel>{label}</SectionLabel>}
        {children}
      </div>
    </section>
  )
}
