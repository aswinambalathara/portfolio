import { SkillIcon } from '@/components/skill-icon'
import { Section } from '@/components/ui/section'
import type { Skill } from '@/payload-types'

const groups: { value: Skill['group']; label: string }[] = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'ai', label: 'AI & Agents' },
  { value: 'database', label: 'Databases' },
  { value: 'devops', label: 'DevOps & Tools' },
]

// FR-50: grouped, icon and name. No ratings or percentage bars.
export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const filled = groups
    .map((group) => ({ ...group, skills: skills.filter((skill) => skill.group === group.value) }))
    .filter((group) => group.skills.length > 0)
  if (filled.length === 0) return null

  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-5">
        {filled.map((group) => (
          <div key={group.value} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="text-sm text-muted-foreground sm:pt-0.5">{group.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {group.skills.map((skill) => (
                  <li key={skill.id} className="inline-flex items-center gap-2">
                    <SkillIcon slug={skill.icon} className="size-3.5 text-muted-foreground" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
