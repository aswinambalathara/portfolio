'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

// Floating pill navigation. The current page (or its parent, for project details) is highlighted.
export function Nav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav
      aria-label="Main"
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-surface/70 p-1 shadow-lg shadow-black/30 backdrop-blur-md"
    >
      <ul className="flex items-center gap-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="block rounded-full px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:text-fg aria-[current=page]:bg-accent aria-[current=page]:text-bg sm:px-5 sm:text-sm"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
