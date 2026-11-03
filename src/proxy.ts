import { NextResponse, type NextRequest } from 'next/server'

// NFR-30: per-request nonce CSP for the public site. Payload's admin and API are excluded.
// style-src keeps 'unsafe-inline' without a nonce, because a nonce would disable it and inline
// style attributes (next/image, the spotlight card) cannot carry one.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'
  const isHttps = (process.env.NEXT_PUBLIC_SITE_URL ?? '').startsWith('https://')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com https://static.cloudflareinsights.com${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self' https://cloudflareinsights.com https://challenges.cloudflare.com",
    'frame-src https://challenges.cloudflare.com',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // 'self' rather than 'none', so Payload's Live Preview can frame the site (FR-08).
    "frame-ancestors 'self'",
    ...(isHttps ? ['upgrade-insecure-requests'] : []),
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|admin|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
