import type { Message } from '@/payload-types'

import { getPayloadClient } from './client'

// Saves a contact form submission (FR-62). Messages are admin-only, so this is a write, never a read.
export async function createMessage(data: Pick<Message, 'name' | 'email' | 'reason' | 'message'>) {
  const payload = await getPayloadClient()
  await payload.create({ collection: 'messages', data: { ...data, status: 'new' } })
}
