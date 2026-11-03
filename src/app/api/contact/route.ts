import { z } from 'zod'

import { createMessage } from '@/lib/cms/messages'
import { contactSchema } from '@/lib/contact-schema'
import { isEmailConfigured, sendContactNotification } from '@/lib/email'
import { createRateLimiter, getClientIp } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

// FR-61: 5 submissions per IP per hour.
const limiter = createRateLimiter({ limit: 5, windowMs: 60 * 60 * 1000 })

// NFR-31: the form's largest valid body is well under this.
const MAX_BODY_BYTES = 10_000

export async function POST(request: Request) {
  const ip = getClientIp(request.headers)
  if (!limiter.hit(ip)) {
    return Response.json(
      { error: 'Too many messages from your connection. Please try again later.' },
      { status: 429 },
    )
  }

  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) {
    return Response.json({ error: 'Message is too large.' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(text)
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: only bots fill this field. Report success so they do not retry.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return Response.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ errors: z.flattenError(parsed.error).fieldErrors }, { status: 400 })
  }

  const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : undefined
  if (!(await verifyTurnstile(token, ip))) {
    return Response.json({ error: 'The spam check failed. Please try again.' }, { status: 400 })
  }

  // FR-62: save first, then email. A failed email still keeps the message.
  await createMessage(parsed.data)
  if (isEmailConfigured()) {
    try {
      await sendContactNotification(parsed.data)
    } catch (error) {
      console.error('Contact email failed:', error)
    }
  } else {
    console.warn('Contact email skipped: SMTP is not configured.')
  }

  return Response.json({ ok: true })
}
