import type { Project } from '@/content/site'

const statuses: Record<Project['status'], { label: string; dot: string }> = {
  live: { label: 'Live', dot: 'bg-online' },
  'in-progress': { label: 'In progress', dot: 'bg-amber-400' },
  completed: { label: 'Completed', dot: 'bg-muted' },
}

// Work or Personal, plus the project's status. Text first, colour second.
export function ProjectBadges({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
      <span
        className={
          project.context === 'work'
            ? 'rounded-full bg-accent/15 px-2.5 py-1 text-accent'
            : 'rounded-full bg-white/5 px-2.5 py-1 text-muted'
        }
      >
        {project.context === 'work' ? 'Work' : 'Personal'}
      </span>
      <span className="inline-flex items-center gap-1.5 text-muted">
        <span aria-hidden className={`size-1.5 rounded-full ${statuses[project.status].dot}`} />
        {statuses[project.status].label}
      </span>
    </div>
  )
}
