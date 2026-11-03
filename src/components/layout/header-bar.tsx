'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Dialog } from 'radix-ui'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

export type NavLink = { href: string; label: string }

// FR-03: sticky header that shrinks after scrolling. The mobile menu is a Radix dialog, which traps
// focus, closes on Esc and returns focus to the trigger.
export function HeaderBar({
  name,
  links,
  hasResume,
}: {
  name: string
  links: NavLink[]
  hasResume: boolean
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const resumeLink = hasResume && (
    <Button asChild size="sm" variant="outline">
      {/* A plain link, so prefetches are not counted as downloads (FR-70). */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/resume">Résumé</a>
    </Button>
  )

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-background/85 backdrop-blur transition-colors duration-200',
        scrolled ? 'border-border' : 'border-transparent',
      )}
    >
      <div
        className={cn(
          'container-page flex items-center justify-between gap-4 transition-[height] duration-200 ease-out',
          scrolled ? 'h-14' : 'h-16',
        )}
      >
        <Link
          href="/"
          className="rounded-sm font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {name || 'Home'}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
          <span className="flex items-center gap-1">
            {resumeLink}
            <ThemeToggle />
          </span>
        </nav>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
            <Dialog.Content
              aria-describedby={undefined}
              className="fixed inset-x-0 top-0 z-50 border-b bg-background px-5 pt-3 pb-6 shadow-lg"
            >
              <div className="flex h-12 items-center justify-between">
                <Dialog.Title className="text-sm text-muted-foreground">Menu</Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X />
                  </Button>
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-3 text-lg hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-4 flex items-center gap-2 px-3">
                {resumeLink}
                <ThemeToggle />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
