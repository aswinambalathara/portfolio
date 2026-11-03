import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

// A CV-style section: a thin rule, the title in the left margin on desktop, content on the right.
export function Section({
  title,
  id,
  className,
  children,
  ...props
}: ComponentProps<'section'> & { title: string; id: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('container-page scroll-mt-16', className)}
      {...props}
    >
      <div className="grid gap-4 border-t py-12 md:grid-cols-[10rem_1fr] md:gap-8 md:py-16">
        <h2 id={`${id}-heading`} className="text-muted-foreground">
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
