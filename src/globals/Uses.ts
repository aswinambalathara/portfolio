import type { GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const Uses: GlobalConfig = {
  slug: 'uses',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.uses]) },
  fields: [{ name: 'content', type: 'richText' }],
}
