import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'

// Anonymised chatbot logs (FR-97). No IP address is stored.
export const ChatLogs: CollectionConfig = {
  slug: 'chat-logs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'toolsCalled', 'createdAt'],
  },
  access: adminOnly,
  defaultSort: '-createdAt',
  fields: [
    { name: 'question', type: 'textarea', required: true },
    { name: 'toolsCalled', type: 'text', hasMany: true },
  ],
}
