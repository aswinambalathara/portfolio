'use client'

import type { ComponentProps, PointerEvent } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Card with a cursor-follow glow, shown only for fine pointers such as a mouse (PRD §9).
export function SpotlightCard({ className, children, ...props }: ComponentProps<typeof Card>) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <Card
      onPointerMove={onPointerMove}
      className={cn('group relative transition-shadow duration-300 hover:shadow-lg', className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--spot-x) var(--spot-y), color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)',
        }}
      />
      {children}
    </Card>
  )
}
