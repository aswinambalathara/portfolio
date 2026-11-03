import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export const getPayloadClient = () => getPayload({ config })

// Caches a CMS read across requests until one of its tags is revalidated (PRD §7.6).
export function cached<T>(keyParts: string[], tags: string[], read: () => Promise<T>): Promise<T> {
  return unstable_cache(read, keyParts, { tags })()
}
