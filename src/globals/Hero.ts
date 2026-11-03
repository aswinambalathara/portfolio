import type { Field, GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

const cta = (name: string): Field => ({
  name,
  type: 'group',
  fields: [
    { name: 'label', type: 'text' },
    { name: 'href', type: 'text' },
  ],
})

export const Hero: GlobalConfig = {
  slug: 'hero',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.hero]) },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    cta('primaryCta'),
    cta('secondaryCta'),
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
