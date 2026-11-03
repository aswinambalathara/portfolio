import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { BrandIcon } from '@/components/brand-icon'
import { ProjectBadges } from '@/components/project-badges'
import { SkillLogo } from '@/components/skill-logo'
import type { Project } from '@/content/site'

// Each card's banner gets one of these washes in turn, so neighbouring cards differ.
const banners = [
  'from-accent-strong/35 via-accent-strong/10 to-cyan/15',
  'from-cyan/25 via-accent-strong/10 to-accent/25',
  'from-accent/30 via-cyan/10 to-accent-strong/20',
  'from-cyan/20 via-accent/15 to-accent-strong/30',
]

const iconLink =
  'relative z-10 grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent'

// The title link stretches over the whole card (after:inset-0), so the card stays clickable while
// the GitHub and live links sit above it as separate links. Confidential projects show neither.
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const extraTech = project.tech.length - 3
  const repoUrl = project.confidential ? undefined : project.repoUrl
  const liveUrl = project.confidential ? undefined : project.liveUrl

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent-strong/15 has-[a:focus-visible]:border-accent">
      <div
        className={`relative flex h-28 items-center justify-center border-b border-line bg-linear-to-br ${banners[index % banners.length]}`}
      >
        <div aria-hidden className="absolute inset-0 bg-dots opacity-60" />
        <span
          aria-hidden
          className="absolute top-3 left-4 font-mono text-xs font-semibold text-fg/40"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <ul aria-hidden className="relative flex gap-2.5">
          {project.tech.slice(0, 4).map((tech, i) => (
            <li
              key={tech}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-bg/70 shadow-lg backdrop-blur transition-transform duration-300 group-hover:-translate-y-1"
            >
              <SkillLogo skill={tech} className="size-5" />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <ProjectBadges project={project} />
        <h2 className="mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-1.5 line-clamp-3 text-sm text-pretty text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech used">
          {project.tech.slice(0, 3).map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-white/5 px-2 py-0.5 font-mono text-[11px] text-fg/80"
            >
              <SkillLogo skill={tech} className="size-3" />
              {tech}
            </li>
          ))}
          {extraTech > 0 && (
            <li className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              +{extraTech}
            </li>
          )}
        </ul>
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-line pt-3 font-mono text-[11px] text-muted">
            <span className="truncate">{project.timeline}</span>
            <div className="flex shrink-0 items-center gap-2">
              {repoUrl && (
                <a
                  href={repoUrl}
                  rel="noopener"
                  target="_blank"
                  aria-label={`${project.title} on GitHub`}
                  className={iconLink}
                >
                  <BrandIcon slug="github" className="size-3.5" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  rel="noopener"
                  target="_blank"
                  aria-label={`${project.title} live site`}
                  className={iconLink}
                >
                  <ExternalLink aria-hidden className="size-3.5" />
                </a>
              )}
              <span className="inline-flex items-center gap-1 pl-1 text-accent">
                View
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
