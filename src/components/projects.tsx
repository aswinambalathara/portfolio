import { ExternalLink, Lock } from 'lucide-react'

import { BrandIcon } from '@/components/brand-icon'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/content/site'

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 px-5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="projects-heading"
          title="Projects"
          subtitle="Selected work, from production systems to things I'm building in public."
        />
        <ul className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.title}
              className="flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span
                  className={
                    project.context === 'work'
                      ? 'rounded-full bg-accent/15 px-2.5 py-1 text-accent'
                      : 'rounded-full bg-white/5 px-2.5 py-1 text-muted'
                  }
                >
                  {project.context === 'work' ? 'Work' : 'Personal'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${project.status === 'live' ? 'bg-online' : 'bg-amber-400'}`}
                  />
                  {project.status === 'live' ? 'Live' : 'In progress'}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-2 text-muted">{project.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-fg/80"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-4 pt-6 text-sm">
                {project.confidential ? (
                  <span className="inline-flex items-center gap-2 text-muted">
                    <Lock className="size-3.5" aria-hidden />
                    Internal project, details shared on request
                  </span>
                ) : (
                  <>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        rel="noopener"
                        className="inline-flex items-center gap-2 text-fg/90 hover:text-accent"
                      >
                        <BrandIcon slug="github" className="size-4" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        rel="noopener"
                        className="inline-flex items-center gap-2 text-fg/90 hover:text-accent"
                      >
                        <ExternalLink className="size-4" aria-hidden />
                        Live demo
                      </a>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
