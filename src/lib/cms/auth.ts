import { getPayloadClient } from './client'

// The logged-in admin, or null. Used to guard Live Preview (FR-08).
export async function getAdminUser(headers: Headers) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers })
  return user
}
