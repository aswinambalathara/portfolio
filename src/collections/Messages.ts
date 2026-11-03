import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'

// Contact form submissions. Created by /api/contact through the Local API.
export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'reason', 'status', 'createdAt'],
  },
  access: adminOnly,
  defaultSort: '-createdAt',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'reason',
      type: 'select',
      options: [
        { label: 'Job', value: 'job' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
}
