import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
  RequestContext,
} from 'payload'

import { TAGS } from '../lib/cms/tags'

type Doc = Record<string, unknown>

// Writes made outside a Next.js request (seed script, résumé counter) set
// context.skipRevalidate, because revalidateTag() is unavailable there.
function revalidate(tags: string[], context: RequestContext, payload: Payload) {
  if (context.skipRevalidate) return

  const unique = [...new Set([...tags, TAGS.knowledgePack])]
  for (const tag of unique) revalidateTag(tag, { expire: 0 })
  payload.logger.info(`Revalidated cache tags: ${unique.join(', ')}`)
}

export function revalidateCollection(getTags: (doc: Doc) => string[]) {
  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, context, req }) => {
    // Include the previous doc's tags so a renamed slug also clears its old page.
    revalidate(
      [...getTags(doc), ...(previousDoc ? getTags(previousDoc) : [])],
      context,
      req.payload,
    )
    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = ({ doc, context, req }) => {
    revalidate(getTags(doc), context, req.payload)
    return doc
  }

  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

export function revalidateGlobal(tags: string[]): GlobalAfterChangeHook[] {
  return [
    ({ doc, context, req }) => {
      revalidate(tags, context, req.payload)
      return doc
    },
  ]
}
