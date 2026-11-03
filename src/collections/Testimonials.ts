import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'
import { revalidateCollection } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'visible', 'order'],
  },
  access: adminOnly,
  defaultSort: 'order',
  hooks: revalidateCollection(() => [TAGS.testimonials]),
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'relationship',
      type: 'text',
      admin: { description: 'For example "Manager at Acme".' },
    },
    { name: 'visible', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
