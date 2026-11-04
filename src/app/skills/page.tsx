import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { SkillLogo } from '@/components/skill-logo'
import { coreStacks, skillGroups } from '@/content/site'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Languages, frameworks and tools I use to design, build and ship.',
  alternates: { canonical: '/skills' },
}

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-32 pb-20">
      <PageHeader
        title="Skills"
        subtitle="Languages, frameworks and tools I use to design, build and ship."
      />
      <div className="space-y-14">
        <section aria-labelledby="core-stack">
          <h2
            id="core-stack"
            className="border-b border-line pb-4 text-center font-mono text-lg font-semibold sm:text-xl"
          >
            Core Stack
          </h2>
          <ul className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            {coreStacks.map((stack, i) => (
              <li
                key={stack.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
                className="flex flex-col rounded-2xl border border-line bg-linear-to-br from-surface to-bg/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent-strong/10"
              >
                <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{stack.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stack.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${stack.title} skills`}>
                  {stack.skills.map((name) => (
                    <li
                      key={name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-3 py-1.5 font-mono text-xs"
                    >
                      <SkillLogo skill={name} className="size-3.5" />
                      {name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {skillGroups.map((group, index) => (
          <section key={group.title} aria-labelledby={`skill-group-${index}`}>
            <h2
              id={`skill-group-${index}`}
              className="border-b border-line pb-4 text-center font-mono text-lg font-semibold sm:text-xl"
            >
              {group.title}
            </h2>
            <ul className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              {group.skills.map((skill, i) => (
                <li
                  key={skill.name}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
                >
                  <div className="group flex size-32 flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-linear-to-br from-surface to-bg/40 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent-strong/10 sm:size-36">
                    <SkillLogo skill={skill} className="size-12" />
                    <span className="px-2 text-center font-mono text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
