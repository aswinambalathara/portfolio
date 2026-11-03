import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'

// Pulsing dot for availability and in-progress badges. Reduced motion stops the pulse.
export function PulseDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('relative flex size-2', className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-primary" />
    </span>
  )
}

const statusLabels: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In progress',
  paused: 'Paused',
  archived: 'Archived',
}

export function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <Badge variant="outline" className="font-mono">
      {status === 'in-progress' && <PulseDot />}
      {status === 'live' && <span aria-hidden className="size-2 rounded-full bg-primary" />}
      {statusLabels[status]}
    </Badge>
  )
}

// Work and Personal stay distinguishable by text, not only by colour (NFR-23).
export function ContextBadge({ context }: { context: Project['context'] }) {
  return context === 'professional' ? (
    <Badge className="border-primary/25 bg-primary/10 font-mono text-primary">Work</Badge>
  ) : (
    <Badge variant="secondary" className="font-mono">
      Personal
    </Badge>
  )
}
