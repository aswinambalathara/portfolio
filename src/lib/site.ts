// Canonical site URL (NFR-14). Also used for absolute redirects, which must not use the proxied host.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)
