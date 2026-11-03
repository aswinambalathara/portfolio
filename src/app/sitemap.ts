import type { MetadataRoute } from 'next'

import { getSiteSettings } from '@/lib/cms/globals'
import { getPosts } from '@/lib/cms/posts'
import { getProjects } from '@/lib/cms/projects'
import { siteUrl } from '@/lib/site'

// Built per request, so flag changes apply without a deploy and the build needs no database.
export const dynamic = 'force-dynamic'

// NFR-11: flagged-off routes, /admin and /styleguide are excluded.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()])
  const posts = settings.flags?.blogEnabled ? await getPosts() : []

  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/projects` },
    { url: `${siteUrl}/contact` },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
    ...(settings.flags?.blogEnabled
      ? [
          { url: `${siteUrl}/blog` },
          ...posts.map((post) => ({
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
          })),
        ]
      : []),
  ]
}
