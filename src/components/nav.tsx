'use client'

import { useEffect, useState } from 'react'

const items = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

// Floating pill navigation. The pill for the section in view is highlighted.
export function Nav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const item of items) {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sections"
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-surface/70 p-1 shadow-lg shadow-black/30 backdrop-blur-md"
    >
      <ul className="flex items-center gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className="block rounded-full px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:text-fg aria-[current=true]:bg-accent aria-[current=true]:text-bg sm:px-4 sm:text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
