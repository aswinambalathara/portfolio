import Link from 'next/link'

import { CmsImage } from '@/components/cms-image'
import { SkillIcon } from '@/components/skill-icon'
import { ContextBadge, StatusBadge } from '@/components/ui/status-badge'
import { populated } from '@/lib/cms/media'
import type { PublicProject } from '@/lib/cms/projects'
import type { Skill } from '@/payload-types'

// FR-21 as a list row: the title link covers the row; repo and demo links sit above it.
// Repo and demo links are already removed from confidential projects by src/lib/cms.
export function ProjectRow({
  project,
  headingLevel = 'h3',
}: {
  project: PublicProject
  headingLevel?: 'h2' | 'h3'
}) {
  const Heading = headingLevel
  const cover = populated(project.coverImage)
  const skills = (project.skills ?? [])
    .map((skill) => populated(skill))
    .filter((skill): skill is Skill => skill !== null)
    .slice(0, 5)

  return (
    <article className="group relative grid gap-4 py-6 sm:grid-cols-[1fr_8rem] sm:gap-8">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Heading className="text-lg">
            <Link
              href={`/projects/${project.slug}`}
              className="decoration-primary/40 underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0 after:rounded-md focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              {project.title}
            </Link>
          </Heading>
          <ContextBadge context={project.context} />
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1.5 max-w-[60ch] text-muted-foreground">{project.summary}</p>
        {skills.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="sr-only">Built with </span>
            {skills.map((skill) => skill.name).join(', ')}
          </p>
        )}
        {(project.repoUrl || project.demoUrl) && (
          <div className="relative z-10 mt-3 flex gap-4 text-sm">
            {project.demoUrl && (
              <a href={project.demoUrl} rel="noopener" className="text-primary hover:underline">
                Live demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                <SkillIcon slug="github" className="size-3.5" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
      {cover && (
        <CmsImage
          media={cover}
          size="thumbnail"
          sizes="8rem"
          className="hidden aspect-[4/3] w-32 rounded-md border object-cover sm:block"
        />
      )}
    </article>
  )
}
