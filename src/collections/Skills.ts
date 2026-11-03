import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'
import { revalidateCollection } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'order', 'featured'],
  },
  access: adminOnly,
  defaultSort: 'order',
  // Projects and experience entries list their skills, so they are cleared too.
  hooks: revalidateCollection(() => [TAGS.skills, TAGS.projects, TAGS.experience]),
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'AI & Agents', value: 'ai' },
        { label: 'Databases', value: 'database' },
        { label: 'DevOps & Tools', value: 'devops' },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Simple Icons slug, for example "react" or "nextdotjs".' },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
