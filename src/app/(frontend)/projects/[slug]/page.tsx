import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { CmsImage } from '@/components/cms-image'
import { JsonLd } from '@/components/json-ld'
import { RichText, hasRichText } from '@/components/rich-text'
import { SkillIcon } from '@/components/skill-icon'
import { Button } from '@/components/ui/button'
import { ContextBadge, StatusBadge } from '@/components/ui/status-badge'
import { getSiteSettings } from '@/lib/cms/globals'
import { populated } from '@/lib/cms/media'
import { getProjectBySlug, getProjectPreview } from '@/lib/cms/projects'
import { buildMetadata } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import type { Media, Skill } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

// Live Preview (FR-08) shows the latest draft. Both paths strip confidential fields.
async function loadProject(slug: string) {
  const { isEnabled } = await draftMode()
  return isEnabled ? getProjectPreview(slug) : getProjectBySlug(slug)
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = await loadProject(slug)
  if (!project) return {}
  return buildMetadata({
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.summary,
    image: project.seo?.image,
    path: `/projects/${project.slug}`,
    type: 'article',
  })
}

// Same CV-style rows as the home page: title in the left margin, content on the right.
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t py-10 md:grid-cols-[10rem_1fr] md:gap-8">
      <h2 className="text-muted-foreground">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

// FR-22: only sections with content are rendered. FR-26: work projects.
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, settings] = await Promise.all([loadProject(slug), getSiteSettings()])
  if (!project) notFound()

  const isWork = project.context === 'professional'
  const company = populated(project.experience)?.company ?? project.companyName
  const cover = populated(project.coverImage)
  const architecture = populated(project.architectureImage)
  const skills = (project.skills ?? [])
    .map((skill) => populated(skill))
    .filter((skill): skill is Skill => skill !== null)
  const gallery = (project.gallery ?? [])
    .map((image) => populated(image))
    .filter((image): image is Media => image !== null)
  const outcomes = project.outcomes ?? []

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    creator: settings.name ? { '@type': 'Person', name: settings.name } : undefined,
    keywords: skills.map((skill) => skill.name).join(', ') || undefined,
    dateCreated: project.startedAt ?? undefined,
  }

  return (
    <article className="container-page pt-12 pb-20 md:pt-16">
      <JsonLd data={creativeWork} />
      <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
        All projects
      </Link>

      <header className="mt-8 md:mt-12">
        <div className="flex flex-wrap gap-2">
          <ContextBadge context={project.context} />
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-3 max-w-[22ch]">{project.title}</h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">{project.summary}</p>
        {isWork && company && <p className="mt-3">Built at {company}</p>}
        {project.confidential && (
          <p className="mt-2 text-sm text-muted-foreground">
            Internal project — details shared at a high level.
          </p>
        )}
        {(project.repoUrl || project.demoUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} rel="noopener">
                  Live demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant="outline">
                <a href={project.repoUrl} rel="noopener">
                  <SkillIcon slug="github" /> Source code
                </a>
              </Button>
            )}
          </div>
        )}
      </header>

      {cover && (
        <CmsImage
          media={cover}
          size="hero"
          priority
          sizes="(min-width: 960px) 896px, 100vw"
          className="mt-10 w-full rounded-md border"
        />
      )}

      <div className="mt-12">
        {project.problem && (
          <Block title="Problem">
            <p className="max-w-[62ch] whitespace-pre-line">{project.problem}</p>
          </Block>
        )}
        {project.role && (
          <Block title="My role">
            <p className="max-w-[62ch] whitespace-pre-line">{project.role}</p>
          </Block>
        )}
        {skills.length > 0 && (
          <Block title="Tech stack">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {skills.map((skill) => (
                <li key={skill.id} className="inline-flex items-center gap-2">
                  <SkillIcon slug={skill.icon} className="size-3.5 text-muted-foreground" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {hasRichText(project.approach) && (
          <Block title="Approach">
            <RichText data={project.approach} className="max-w-[62ch]" />
          </Block>
        )}
        {architecture && (
          <Block title="Architecture">
            <CmsImage
              media={architecture}
              sizes="(min-width: 960px) 700px, 100vw"
              className="w-full rounded-md border"
            />
          </Block>
        )}
        {hasRichText(project.challenges) && (
          <Block title="Challenges">
            <RichText data={project.challenges} className="max-w-[62ch]" />
          </Block>
        )}
        {outcomes.length > 0 && (
          <Block title="Outcomes">
            <ul className="max-w-[62ch] list-disc space-y-2 pl-5 marker:text-border">
              {outcomes.map((outcome) => (
                <li key={outcome.id ?? outcome.text}>{outcome.text}</li>
              ))}
            </ul>
          </Block>
        )}
        {gallery.length > 0 && (
          <Block title="Gallery">
            <ul className="grid gap-4 sm:grid-cols-2">
              {gallery.map((image) => (
                <li key={image.id}>
                  <CmsImage
                    media={image}
                    size="card"
                    sizes="(min-width: 640px) 350px, 100vw"
                    className="w-full rounded-md border"
                  />
                </li>
              ))}
            </ul>
          </Block>
        )}
      </div>
    </article>
  )
}
