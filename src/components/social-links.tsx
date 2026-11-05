import { Mail } from 'lucide-react'

import { BrandIcon } from '@/components/brand-icon'
import { site } from '@/content/site'

const labels = { github: 'GitHub', linkedin: 'LinkedIn' } as const

const link =
  'grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg'

// Icon row for the social profiles (new tab), optionally led by an email link.
export function SocialLinks({
  withEmail = false,
  className = '',
}: {
  withEmail?: boolean
  className?: string
}) {
  const socials = site.socials.filter((social) => social.href)
  const showEmail = withEmail && site.email
  if (!socials.length && !showEmail) return null

  return (
    <ul className={`flex items-center justify-center gap-2 ${className}`}>
      {showEmail && (
        <li>
          <a href={`mailto:${site.email}`} aria-label="Email" className={link}>
            <Mail className="size-5" aria-hidden />
          </a>
        </li>
      )}
      {socials.map((social) => (
        <li key={social.platform}>
          <a
            href={social.href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${labels[social.platform]} (opens in a new tab)`}
            className={link}
          >
            <BrandIcon slug={social.platform} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
