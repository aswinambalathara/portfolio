import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidate'
import { projectTag, TAGS } from '../lib/cms/tags'

const isProfessional = (data: Record<string, unknown> | undefined) =>
  data?.context === 'professional'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'context', 'status', 'featured', '_status'],
    // FR-08: /api/preview checks the admin session, turns on draft mode and opens the project page.
    livePreview: {
      url: ({ data }) =>
        typeof data?.slug === 'string'
          ? `/api/preview?slug=${encodeURIComponent(data.slug)}`
          : null,
    },
    preview: (doc) =>
      typeof doc?.slug === 'string' ? `/api/preview?slug=${encodeURIComponent(doc.slug)}` : null,
  },
  access: adminOnly,
  versions: { drafts: true },
  defaultSort: 'order',
  hooks: revalidateCollection((doc) => [
    TAGS.projects,
    ...(typeof doc.slug === 'string' ? [projectTag(doc.slug)] : []),
  ]),
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'summary', type: 'textarea', required: true, maxLength: 160 },
    {
      name: 'context',
      type: 'select',
      required: true,
      defaultValue: 'personal',
      options: [
        { label: 'Personal', value: 'personal' },
        { label: 'Professional (work)', value: 'professional' },
      ],
    },
    {
      name: 'experience',
      type: 'relationship',
      relationTo: 'experience',
      admin: { condition: isProfessional },
    },
    {
      name: 'companyName',
      type: 'text',
      admin: {
        condition: isProfessional,
        description: 'Used when no experience entry is linked.',
      },
    },
    {
      name: 'confidential',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: isProfessional,
        description: 'Hides the repo link, demo link and gallery on the site and from the chatbot.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'in-progress',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Paused', value: 'paused' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'AI agents', value: 'ai-agents' },
        { label: 'Full-stack', value: 'full-stack' },
        { label: 'Backend', value: 'backend' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Tooling', value: 'tooling' },
      ],
    },
    { name: 'skills', type: 'relationship', relationTo: 'skills', hasMany: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'architectureImage', type: 'upload', relationTo: 'media' },
    { name: 'demoUrl', type: 'text' },
    { name: 'repoUrl', type: 'text' },
    { name: 'problem', type: 'textarea' },
    { name: 'role', type: 'textarea' },
    { name: 'approach', type: 'richText' },
    { name: 'challenges', type: 'richText' },
    { name: 'outcomes', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'progressNote', type: 'textarea' },
    { name: 'startedAt', type: 'date' },
    seoField,
  ],
}
