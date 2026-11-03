import { ArrowLeft, ExternalLink, Lock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { BrandIcon } from '@/components/brand-icon'
import { ProjectBadges } from '@/components/project-badges'
import { projects } from '@/content/site'

type Props = { params: Promise<{ slug: string }> }

// Every project page is generated at build time; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

const findProject = (slug: string) => projects.find((project) => project.slug === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  }
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface/50 p-6 sm:p-8">
      <h2 className="font-mono text-sm text-accent">{title}</h2>
      <div className="mt-3 text-fg/90">{children}</div>
    </section>
  )
}

export default async function ProjectPage({ params }: Props) {
  const project = findProject((await params).slug)
  if (!project) notFound()

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Type', value: project.context === 'work' ? 'Work project' : 'Personal project' },
  ]

  return (
    <article className="mx-auto max-w-4xl px-5 pt-32 pb-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        All projects
      </Link>

      <header className="mt-8">
        <ProjectBadges project={project} />
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.confidential ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted">
              <Lock aria-hidden className="size-4" />
              Internal project, details shared on request
            </span>
          ) : (
            <>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-fg"
                >
                  <ExternalLink aria-hidden className="size-4" />
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <BrandIcon slug="github" className="size-4" />
                  Source code
                </a>
              )}
            </>
          )}
        </div>
      </header>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-surface/90 p-5">
            <dt className="font-mono text-xs text-muted">{fact.label}</dt>
            <dd className="mt-1.5 text-sm">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-6">
        <Block title="Overview">
          <p>{project.overview}</p>
        </Block>
        <div className="grid gap-6 md:grid-cols-2">
          <Block title="The problem">
            <p>{project.problem}</p>
          </Block>
          <Block title="Tech stack">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          </Block>
        </div>
        <Block title="What I built">
          <ul className="space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </Block>
        <div className="grid gap-6 md:grid-cols-2">
          <Block title="Challenges">
            <p>{project.challenges}</p>
          </Block>
          <Block title="Outcome">
            <p>{project.outcome}</p>
          </Block>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
        >
          Want to know more? Let&apos;s talk
        </Link>
      </div>
    </article>
  )
}
