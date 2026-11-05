import { Copyright } from 'lucide-react'
import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="flex items-center justify-center gap-1.5 px-5 pt-6 pb-10 font-mono text-xs text-muted">
      <Copyright aria-label="Copyright" className="size-3.5 shrink-0" />
      {new Date().getFullYear()} {site.name} ({site.alternateName})
    </footer>
  )
}
