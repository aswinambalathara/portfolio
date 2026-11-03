// Cloudflare Turnstile (FR-61). Without keys the check is skipped; honeypot and rate limit still apply.
export const isTurnstileEnabled = () =>
  Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!isTurnstileEnabled()) return true
  if (!token) return false

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY ?? '',
      response: token,
      remoteip: ip,
    }),
  })
  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}
