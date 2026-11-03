import { CmsImage } from '@/components/cms-image'
import { Section } from '@/components/ui/section'
import { populated } from '@/lib/cms/media'
import type { About, SiteSetting } from '@/payload-types'

// FR-30: short bio as prose, with the facts as a definition list. Renders only what has content.
export function AboutSection({ about, settings }: { about: About; settings: SiteSetting }) {
  const photo = populated(about.photo)
  const facts = [
    ...(settings.location ? [{ label: 'Location', value: settings.location }] : []),
    ...(about.currentFocus ? [{ label: 'Current focus', value: about.currentFocus }] : []),
    ...(about.yearsOfExperience != null
      ? [{ label: 'Experience', value: `${about.yearsOfExperience}+ years` }]
      : []),
    ...(about.quickFacts ?? []).map((fact) => ({ label: fact.label, value: fact.value })),
  ]
  if (!about.shortBio && !photo && facts.length === 0) return null

  return (
    <Section id="about" title="About">
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
        {about.shortBio && (
          <p className="max-w-[60ch] text-lg whitespace-pre-line">{about.shortBio}</p>
        )}
        {photo && (
          <CmsImage
            media={photo}
            size="thumbnail"
            sizes="6rem"
            className="size-24 shrink-0 rounded-md border object-cover"
          />
        )}
      </div>
      {facts.length > 0 && (
        <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm text-muted-foreground">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  )
}
