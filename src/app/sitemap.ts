import type { MetadataRoute } from 'next'

import { projects, site } from '@/content/site'

// Static export needs metadata routes marked static, so the file is written at build time.
export const dynamic = 'force-static'

// Every public page, at its canonical URL. No lastModified: the content has no real edit dates.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/skills', '/contact']
  return paths.map((path) => ({ url: `${site.url}${path}` }))
}
