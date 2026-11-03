import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/site'

// NFR-11
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/styleguide'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
