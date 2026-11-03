import { getSiteSettings } from '@/lib/cms/globals'
import { getProjects } from '@/lib/cms/projects'
import { formatDate } from '@/lib/format'

// FR-04: socials, email, credit line and the date content last changed.
export async function SiteFooter() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()])
  const lastUpdated = [settings.updatedAt, ...projects.map((project) => project.updatedAt)]
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1)

  return (
    <footer className="container-page">
      <div className="flex flex-col gap-4 border-t py-10 text-sm text-muted-foreground md:flex-row md:justify-between">
        <div className="space-y-1">
          <p>Built with Next.js, Payload &amp; AI</p>
          {lastUpdated && <p>Last updated {formatDate(lastUpdated)}</p>}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {settings.email && (
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-foreground">
                {settings.email}
              </a>
            </li>
          )}
          {(settings.socials ?? []).map((social) => (
            <li key={social.id ?? social.url}>
              <a href={social.url} rel="me noopener" className="hover:text-foreground">
                {social.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
