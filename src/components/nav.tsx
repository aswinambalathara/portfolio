'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const items = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

type Pill = { left: number; width: number; animate: boolean }

// A swipe counts when the finger travels at least this far sideways, mostly horizontally, quickly.
const SWIPE_MIN_DISTANCE = 60
const SWIPE_MAX_DURATION = 600
// Swipes that start this close to a screen edge belong to the browser's back/forward gesture.
const EDGE_GUARD = 24

// True when the touch starts inside something that handles its own sideways movement or typing.
function ownsHorizontalGesture(target: EventTarget | null) {
  for (let el = target instanceof Element ? target : null; el; el = el.parentElement) {
    if (el.matches('input, textarea, select, [contenteditable="true"]')) return true
    const { overflowX } = getComputedStyle(el)
    if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth) return true
  }
  return false
}

// Floating pill navigation. The current page (or its parent, for project details) is highlighted
// by a pill that slides between items. Before the pill is measured, the active link has its own
// background so the highlight never flickers.
export function Nav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  const activeHref = items.find((item) => isActive(item.href))?.href

  const router = useRouter()
  const activeIndex = items.findIndex((item) => item.href === activeHref)

  // On touch screens, swiping left opens the next page and swiping right the previous one.
  useEffect(() => {
    if (activeIndex === -1 || !window.matchMedia('(pointer: coarse)').matches) return
    let start: { x: number; y: number; time: number } | null = null

    function onTouchStart(event: TouchEvent) {
      const touch = event.touches[0]
      start =
        event.touches.length === 1 &&
        touch.clientX > EDGE_GUARD &&
        touch.clientX < window.innerWidth - EDGE_GUARD &&
        !ownsHorizontalGesture(event.target) &&
        !window.getSelection()?.toString()
          ? { x: touch.clientX, y: touch.clientY, time: event.timeStamp }
          : null
    }

    function onTouchEnd(event: TouchEvent) {
      if (!start) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      const quick = event.timeStamp - start.time < SWIPE_MAX_DURATION
      start = null
      if (!quick || Math.abs(dx) < SWIPE_MIN_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return
      const next = items[activeIndex + (dx < 0 ? 1 : -1)]
      if (next) router.push(next.href)
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [activeIndex, router])

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
