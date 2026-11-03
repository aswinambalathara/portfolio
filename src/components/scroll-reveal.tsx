'use client'

import { useEffect } from 'react'

// Fades up every element marked with `data-reveal` as it scrolls into view, including ones added
// later (page changes, more projects loading). Elements only start hidden once this has run, so the
// page still shows everything without JavaScript.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    function scan() {
      document
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach((element) => observer.observe(element))
    }
    scan()
    const mutations = new MutationObserver(scan)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])

  return null
}
