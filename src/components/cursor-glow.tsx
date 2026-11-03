'use client'

import { useEffect, useRef } from 'react'

// A soft glow that follows the mouse, behind the page content. Mouse and trackpad only,
// and off when the visitor prefers reduced motion.
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    let frame = 0
    function onMove(event: PointerEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const glow = ref.current
        if (!glow) return
        glow.style.setProperty('--x', `${event.clientX}px`)
        glow.style.setProperty('--y', `${event.clientY}px`)
        glow.style.opacity = '1'
      })
    }
    function onLeave() {
      if (ref.current) ref.current.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgb(139 92 246 / 0.16), rgb(34 211 238 / 0.05) 35%, transparent 60%)',
      }}
    />
  )
}
