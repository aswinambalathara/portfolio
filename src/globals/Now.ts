import type { GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

// updatedAt is added automatically and shown as the page's "last updated" date.
export const Now: GlobalConfig = {
  slug: 'now',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.now]) },
  fields: [{ name: 'content', type: 'richText' }],
}
