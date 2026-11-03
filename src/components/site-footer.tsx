import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="px-5 pt-6 pb-10 text-center font-mono text-xs text-muted">
      © {new Date().getFullYear()} {site.name}
    </footer>
  )
}
