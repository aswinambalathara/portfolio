import type { GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.seoDefaults]) },
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'keywords', type: 'text', hasMany: true },
  ],
}
