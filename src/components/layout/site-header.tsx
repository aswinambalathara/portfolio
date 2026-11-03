import { getSiteSettings } from '@/lib/cms/globals'
import { populated } from '@/lib/cms/media'

import { HeaderBar, type NavLink } from './header-bar'

export async function SiteHeader() {
  const settings = await getSiteSettings()

  const links: NavLink[] = [
    { href: '/projects', label: 'Projects' },
    { href: '/#about', label: 'About' },
    { href: '/#experience', label: 'Experience' },
    { href: '/contact', label: 'Contact' },
    // FR-80: the blog link only appears when the blog is switched on.
    ...(settings.flags?.blogEnabled ? [{ href: '/blog', label: 'Blog' }] : []),
  ]

  return (
    <HeaderBar
      name={settings.name ?? ''}
      links={links}
      hasResume={Boolean(populated(settings.resume)?.url)}
    />
  )
}
