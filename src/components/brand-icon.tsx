import * as icons from 'simple-icons'

type SimpleIcon = { title: string; path: string }

const bySlug = icons as unknown as Record<string, SimpleIcon | undefined>

// Tech and social logos from Simple Icons, e.g. slug "nextdotjs" -> siNextdotjs.
export function BrandIcon({ slug, className = 'size-4' }: { slug?: string; className?: string }) {
  const icon = slug ? bySlug[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`] : undefined
  if (!icon) return null
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 fill-current ${className}`}>
      <path d={icon.path} />
    </svg>
  )
}
