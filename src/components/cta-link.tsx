import Link from 'next/link'
import type { ComponentProps } from 'react'

// Internal links use next/link. The résumé link is a plain <a>, so prefetches are not counted as
// downloads (FR-70), and external links open normally.
export function CtaLink({ href, ...props }: ComponentProps<'a'> & { href: string }) {
  const isPlain = href === '/resume' || /^(https?:|mailto:)/.test(href)
  return isPlain ? <a href={href} {...props} /> : <Link href={href} {...props} />
}
