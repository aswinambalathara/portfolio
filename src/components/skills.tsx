import { BrandIcon } from '@/components/brand-icon'
import { SectionHeading } from '@/components/section-heading'
import { skillGroups } from '@/content/site'

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 px-5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="skills-heading"
          title="Skills"
          subtitle="The tools I use to design, build and ship."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent/40"
            >
              <h3 className="font-mono text-sm text-accent">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1.5 text-sm"
                  >
                    <BrandIcon slug={skill.icon} className="size-3.5 text-muted" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
