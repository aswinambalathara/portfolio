import type { Where } from 'payload'

import type { Project } from '@/payload-types'

import { cached, getPayloadClient } from './client'
import { projectTag, TAGS } from './tags'

type HiddenWhenConfidential = 'repoUrl' | 'demoUrl' | 'gallery'

export type PublicProject = Omit<Project, HiddenWhenConfidential> &
  Partial<Pick<Project, HiddenWhenConfidential>>

// FR-26: confidential work projects never expose their repo link, demo link or gallery.
export function toPublicProject(project: Project): PublicProject {
  if (!project.confidential) return project
  const { repoUrl: _repoUrl, demoUrl: _demoUrl, gallery: _gallery, ...rest } = project
  return rest
}

// The Local API bypasses access control, so drafts must be excluded here.
const published: Where = { _status: { equals: 'published' } }

async function findProjects(where: Where, limit?: number) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where,
    draft: false,
    depth: 1,
    sort: 'order',
    ...(limit ? { limit } : { pagination: false }),
  })
  return docs.map(toPublicProject)
}

export const getProjects = () =>
  cached(['projects'], [TAGS.projects], () => findProjects(published))

// FR-20: featured projects on the home page, at most 4.
export const getFeaturedProjects = () =>
  cached(['projects', 'featured'], [TAGS.projects], () =>
    findProjects({ and: [published, { featured: { equals: true } }] }, 4),
  )

// Live Preview (FR-08): the latest draft for the logged-in admin. Uncached, and still filtered.
export async function getProjectPreview(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    draft: true,
    depth: 1,
    limit: 1,
  })
  return docs[0] ? toPublicProject(docs[0]) : null
}

export const getProjectBySlug = (slug: string) =>
  cached(['project', slug], [TAGS.projects, projectTag(slug)], async () => {
    const [project] = await findProjects({ and: [published, { slug: { equals: slug } }] }, 1)
    return project ?? null
  })
