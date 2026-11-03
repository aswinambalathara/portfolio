import { ProjectRow } from '@/components/projects/project-row'
import { getProjects } from '@/lib/cms/projects'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata() {
  return buildMetadata({ title: 'Projects', path: '/projects' })
}

// Filters (FR-23) arrive in Phase 4.
export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container-page pt-16 pb-20 md:pt-24">
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No projects published yet.</p>
      ) : (
        <ul className="mt-10 divide-y border-t">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectRow project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
