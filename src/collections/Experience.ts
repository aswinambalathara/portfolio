import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'
import { revalidateCollection } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'startDate', 'isCurrent'],
  },
  access: adminOnly,
  defaultSort: '-startDate',
  // Work projects show the company name, so they are cleared too.
  hooks: revalidateCollection(() => [TAGS.experience, TAGS.projects]),
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      defaultValue: 'full-time',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Internship', value: 'internship' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    { name: 'location', type: 'text' },
    { name: 'remote', type: 'checkbox', defaultValue: false },
    { name: 'startDate', type: 'date', required: true },
    {
      name: 'endDate',
      type: 'date',
      admin: { condition: (data) => !data?.isCurrent },
    },
    { name: 'isCurrent', type: 'checkbox', defaultValue: false },
    { name: 'highlights', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'skills', type: 'relationship', relationTo: 'skills', hasMany: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
