import type { GlobalConfig } from 'payload'

import { adminOnlyGlobal } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { TAGS } from '../lib/cms/tags'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: adminOnlyGlobal,
  hooks: { afterChange: revalidateGlobal([TAGS.siteSettings]) },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'tagline', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'location', type: 'text' },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { equals: 'application/pdf' } },
      admin: { description: 'PDF only. The résumé buttons are hidden when this is empty.' },
    },
    {
      name: 'resumeDownloads',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    { name: 'bookingUrl', type: 'text' },
    {
      name: 'availability',
      type: 'group',
      fields: [
        { name: 'isOpen', type: 'checkbox', defaultValue: true },
        { name: 'text', type: 'text' },
        { name: 'locations', type: 'text', hasMany: true },
      ],
    },
    {
      name: 'flags',
      type: 'group',
      fields: [
        { name: 'blogEnabled', type: 'checkbox', defaultValue: false },
        { name: 'chatbotEnabled', type: 'checkbox', defaultValue: false },
        { name: 'githubStatsEnabled', type: 'checkbox', defaultValue: false },
        { name: 'testimonialsEnabled', type: 'checkbox', defaultValue: false },
        { name: 'nowEnabled', type: 'checkbox', defaultValue: false },
        { name: 'usesEnabled', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
