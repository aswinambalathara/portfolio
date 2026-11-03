import type { GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const ChatbotSettings: GlobalConfig = {
  slug: 'chatbot-settings',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.chatbotSettings]) },
  fields: [
    {
      name: 'instructions',
      type: 'textarea',
      admin: { description: 'Start of the system prompt. Never shown to visitors.' },
    },
    { name: 'starterQuestions', type: 'text', hasMany: true },
    { name: 'extraFacts', type: 'richText' },
    { name: 'dailyLimit', type: 'number', defaultValue: 300 },
  ],
}
