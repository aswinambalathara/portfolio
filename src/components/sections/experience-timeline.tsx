import Link from 'next/link'

import { Section } from '@/components/ui/section'
import { populated } from '@/lib/cms/media'
import type { PublicProject } from '@/lib/cms/projects'
import { formatDateRange, formatDuration } from '@/lib/format'
import type { Experience, Skill } from '@/payload-types'

const employmentLabels: Record<Experience['employmentType'], string> = {
  'full-time': 'Full-time',
  internship: 'Internship',
  freelance: 'Freelance',
  contract: 'Contract',
}

// FR-40 to FR-42: newest first, dates in their own column, with the work projects for each role.
export function ExperienceTimeline({
  entries,
  projects,
}: {
  entries: Experience[]
  projects: PublicProject[]
}) {
  if (entries.length === 0) return null

  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {entries.map((entry) => {
          const end = entry.isCurrent ? null : entry.endDate
          const skills = (entry.skills ?? [])
            .map((skill) => populated(skill))
            .filter((skill): skill is Skill => skill !== null)
          const linked = projects.filter(
            (project) => (populated(project.experience)?.id ?? project.experience) === entry.id,
          )
          const place = [entry.location, entry.remote ? 'Remote' : null].filter(Boolean).join(', ')

          return (
            <li key={entry.id} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <p className="tabular text-sm text-muted-foreground sm:pt-0.5">
                {formatDateRange(entry.startDate, end)}
                <span className="block">{formatDuration(entry.startDate, end)}</span>
              </p>
              <div>
                <h3>
                  {entry.role}, {entry.company}
                  {entry.isCurrent && (
                    <span className="ml-2 rounded-sm bg-primary/10 px-1.5 py-0.5 align-middle text-xs font-medium text-primary">
                      Current
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {employmentLabels[entry.employmentType]}
                  {place && `, ${place}`}
                </p>
                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="mt-3 max-w-[62ch] list-disc space-y-1.5 pl-5 marker:text-border">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight.id ?? highlight.text}>{highlight.text}</li>
                    ))}
                  </ul>
                )}
                {skills.length > 0 && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {skills.map((skill) => skill.name).join(', ')}
                  </p>
                )}
                {linked.length > 0 && (
                  <p className="mt-3 text-sm">
                    <span className="text-muted-foreground">Projects at this role: </span>
                    {linked.map((project, index) => (
                      <span key={project.id}>
                        {index > 0 && ', '}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-primary hover:underline"
                        >
                          {project.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
