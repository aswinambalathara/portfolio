import type { CollectionConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateCollection } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const Media: CollectionConfig = {
  slug: 'media',
  // Read stays public so images and the résumé PDF can be served. Treat every upload as public.
  access: {
    ...adminOnly,
    read: anyone,
  },
  // Media appears inside every content type, so a change clears all content tags.
  hooks: revalidateCollection(() => Object.values(TAGS)),
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 800, height: 600 },
      { name: 'hero', width: 1600 },
      { name: 'og', width: 1200, height: 630 },
    ],
  },
}
