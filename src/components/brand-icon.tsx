import * as icons from 'simple-icons'

type SimpleIcon = { title: string; path: string; hex: string }

const bySlug = icons as unknown as Record<string, SimpleIcon | undefined>

// Very dark brand colours (Next.js, Express) would vanish on the dark background, so those use the
// text colour instead.
function readableHex(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.25 ? undefined : `#${hex}`
}

// Tech and social logos from Simple Icons, e.g. slug "nextdotjs" -> siNextdotjs.
export function BrandIcon({
  slug,
  className = 'size-4',
  colored = false,
}: {
  slug?: string
  className?: string
  colored?: boolean
}) {
  const icon = slug ? bySlug[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`] : undefined
  if (!icon) return null
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`shrink-0 fill-current ${className}`}
      style={colored ? { color: readableHex(icon.hex) } : undefined}
    >
      <path d={icon.path} />
    </svg>
  )
}
