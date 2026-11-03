import { BlocksFeature, CodeBlock, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidate'
import { postTag, TAGS } from '../lib/cms/tags'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
  },
  access: adminOnly,
  versions: { drafts: true },
  defaultSort: '-publishedAt',
  hooks: revalidateCollection((doc) => [
    TAGS.posts,
    ...(typeof doc.slug === 'string' ? [postTag(doc.slug)] : []),
  ]),
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'excerpt', type: 'textarea' },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [CodeBlock()] }),
        ],
      }),
    },
    { name: 'tags', type: 'text', hasMany: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    seoField,
  ],
}
