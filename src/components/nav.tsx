'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef, useState } from 'react'

const items = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

type Pill = { left: number; width: number; animate: boolean }

// Floating pill navigation. The current page (or its parent, for project details) is highlighted
// by a pill that slides between items. Before the pill is measured, the active link has its own
// background so the highlight never flickers.
export function Nav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  const activeHref = items.find((item) => isActive(item.href))?.href

  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<Pill | null>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    function measure(animate: boolean) {
      const link = list!.querySelector<HTMLElement>('[aria-current="page"]')
      setPill((current) =>
        link
          ? { left: link.offsetLeft, width: link.offsetWidth, animate: animate && current !== null }
          : null,
      )
    }
    measure(true)
    // Widths change when the web font loads or the breakpoint switches; follow without sliding.
    const observer = new ResizeObserver(() => measure(false))
    observer.observe(list)
    return () => observer.disconnect()
  }, [activeHref])

  return (
    <nav
      aria-label="Main"
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-surface/70 p-1 shadow-lg shadow-black/30 backdrop-blur-md"
    >
      <ul ref={listRef} className="relative flex items-center gap-0.5">
        {pill && (
          <li
            aria-hidden
            className={`absolute inset-y-0 left-0 rounded-full bg-accent shadow-md shadow-accent-strong/30 ${pill.animate ? 'transition-[translate,width] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]' : ''}`}
            style={{ translate: `${pill.left}px 0`, width: pill.width }}
          />
        )}
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === activeHref ? 'page' : undefined}
              className={`relative block rounded-full px-3.5 py-1.5 font-mono text-xs text-muted transition-colors duration-300 hover:text-fg aria-[current=page]:text-bg sm:px-5 sm:text-sm ${pill ? '' : 'aria-[current=page]:bg-accent'}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
