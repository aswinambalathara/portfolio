import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'

// Pulsing dot for availability and in-progress work. Reduced motion stops the pulse.
export function PulseDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('relative flex size-2', className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
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

const tag = 'inline-flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-xs font-medium'

export function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span className={cn(tag, 'text-muted-foreground')}>
      {status === 'in-progress' && <PulseDot className="size-1.5" />}
      {statusLabels[status]}
    </span>
  )
}

// Work and Personal differ by text first, and only subtly by colour (NFR-23).
export function ContextBadge({ context }: { context: Project['context'] }) {
  return context === 'professional' ? (
    <span className={cn(tag, 'bg-primary/10 text-primary')}>Work</span>
  ) : (
    <span className={cn(tag, 'bg-secondary text-secondary-foreground')}>Personal</span>
  )
}
