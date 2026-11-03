import { isDatabaseUp } from '@/lib/cms/client'

export const dynamic = 'force-dynamic'

// NFR-40: HTTP 200 only when MongoDB is reachable.
export async function GET() {
  const db = await isDatabaseUp()
  return Response.json(
    { status: 'ok', db: db ? 'ok' : 'down', version: process.env.IMAGE_TAG || 'dev' },
    { status: db ? 200 : 503 },
  )
}
