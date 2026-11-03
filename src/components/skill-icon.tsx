import * as icons from 'simple-icons'

import { cn } from '@/lib/utils'

type SimpleIcon = { title: string; path: string }

const bySlug = icons as unknown as Record<string, SimpleIcon | undefined>

// Simple Icons exports each logo as "si" + the capitalised slug, e.g. siNextdotjs.
export function SkillIcon({ slug, className }: { slug?: string | null; className?: string }) {
  const icon = slug ? bySlug[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`] : undefined
  if (!icon) return null

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn('size-4 shrink-0 fill-current', className)}>
      <path d={icon.path} />
    </svg>
  )
}
