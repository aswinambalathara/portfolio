import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { SkillLogo } from '@/components/skill-logo'
import { skillGroups } from '@/content/site'

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
        {skillGroups.map((group, index) => (
          <section key={group.title} aria-labelledby={`skill-group-${index}`}>
            <h2
              id={`skill-group-${index}`}
              className="border-b border-line pb-4 text-center font-mono text-lg font-semibold sm:text-xl"
            >
              {group.title}
            </h2>
            <ul className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="group flex size-32 flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-linear-to-br from-surface to-bg/40 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent-strong/10 sm:size-36"
                >
                  <SkillLogo skill={skill} className="size-12" />
                  <span className="px-2 text-center font-mono text-sm font-medium">
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
