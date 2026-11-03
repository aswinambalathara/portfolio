import type { GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const About: GlobalConfig = {
  slug: 'about',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.about]) },
  fields: [
    { name: 'shortBio', type: 'textarea' },
    { name: 'longBio', type: 'richText' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'currentFocus', type: 'text' },
    { name: 'yearsOfExperience', type: 'number' },
    {
      name: 'quickFacts',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
