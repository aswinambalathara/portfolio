import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export const getPayloadClient = () => getPayload({ config })

// NFR-40: true when MongoDB answers within the timeout.
export async function isDatabaseUp(timeoutMs = 3000) {
  const check = (async () => {
    const payload = await getPayloadClient()
    await payload.count({ collection: 'users', overrideAccess: true })
    return true
  })()
  const timeout = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeoutMs))
  return Promise.race([check, timeout]).catch(() => false)
}

// Caches a CMS read across requests until one of its tags is revalidated (PRD §7.6).
export function cached<T>(keyParts: string[], tags: string[], read: () => Promise<T>): Promise<T> {
  return unstable_cache(read, keyParts, { tags })()
}
