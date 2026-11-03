import type { Metadata } from 'next'

import { LoadMoreList } from '@/components/load-more-list'
import { PageHeader } from '@/components/page-header'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/content/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected work, from production systems to things I am building in public.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 pb-20">
      <PageHeader
        title="Projects"
        subtitle="Selected work, from production systems to things I'm building in public."
      />
      <LoadMoreList batch={8} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </LoadMoreList>
    </div>
  )
}
