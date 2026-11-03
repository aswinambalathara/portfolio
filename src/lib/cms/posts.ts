import type { Where } from 'payload'

import { cached, getPayloadClient } from './client'
import { postTag, TAGS } from './tags'

// The Local API bypasses access control, so drafts must be excluded here (FR-82).
const published: Where = { _status: { equals: 'published' } }

async function findPosts(where: Where, limit?: number) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where,
    draft: false,
    depth: 1,
    sort: '-publishedAt',
    ...(limit ? { limit } : { pagination: false }),
  })
  return docs
}

export const getPosts = () => cached(['posts'], [TAGS.posts], () => findPosts(published))

export const getPostBySlug = (slug: string) =>
  cached(['post', slug], [TAGS.posts, postTag(slug)], async () => {
    const [post] = await findPosts({ and: [published, { slug: { equals: slug } }] }, 1)
    return post ?? null
  })
