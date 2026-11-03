import type { Project } from '@/content/site'

// Work or Personal, plus live or in-progress status. Text first, colour second.
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
        <span
          aria-hidden
          className={`size-1.5 rounded-full ${project.status === 'live' ? 'bg-online' : 'bg-amber-400'}`}
        />
        {project.status === 'live' ? 'Live' : 'In progress'}
      </span>
    </div>
  )
}
