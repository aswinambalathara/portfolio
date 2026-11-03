import Link from 'next/link'

import { ProjectRow } from '@/components/projects/project-row'
import { Section } from '@/components/ui/section'
import type { PublicProject } from '@/lib/cms/projects'

// FR-20: up to 4 featured projects, already sorted by order in src/lib/cms.
export function FeaturedProjects({ projects }: { projects: PublicProject[] }) {
  if (projects.length === 0) return null

  return (
    <Section id="projects" title="Projects">
      <ul className="-mt-6 divide-y">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectRow project={project} />
          </li>
        ))}
      </ul>
      <Link href="/projects" className="mt-4 inline-block text-sm text-primary hover:underline">
        All projects
      </Link>
    </Section>
  )
}
