'use client'

import { useEffect, useRef } from 'react'

const colors = ['167 139 250', '34 211 238', '232 234 240'] // accent, cyan, fg

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  phase: number
  color: string
}

// Small dots drifting slowly upwards and twinkling, behind the page content. Drawn once and left
// still when the visitor prefers reduced motion.
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let particles: Particle[] = []

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(85, Math.round((width * height) / 14750))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.15 + 0.05),
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height)
      for (const p of particles) {
        const alpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(time / 1200 + p.phase))
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgb(${p.color} / ${alpha})`
        ctx!.fill()
      }
    }

    // The mouse gently pushes nearby dots aside. Mouse and trackpad only.
    const pointer = { x: -1000, y: -1000 }
    function onMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    function onLeave() {
      pointer.x = pointer.y = -1000
    }

    let frame = 0
    function tick(time: number) {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist > 0 && dist < 120) {
          const push = (1 - dist / 120) * 1.5
          p.x += (dx / dist) * push
          p.y += (dy / dist) * push
        }
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        if (p.x < -4) p.x = width + 4
        else if (p.x > width + 4) p.x = -4
      }
      draw(time)
      frame = requestAnimationFrame(tick)
    }

    resize()
    if (reducedMotion) draw(0)
    else frame = requestAnimationFrame(tick)

    function onResize() {
      resize()
      if (reducedMotion) draw(0)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 size-full" />
  )
}
