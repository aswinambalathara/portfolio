import { Bot, Layers, ListOrdered, Sparkles, Webhook } from 'lucide-react'

import { BrandIcon } from '@/components/brand-icon'
import { skillGroups, type Skill } from '@/content/site'

const uiIcons = { api: Webhook, llm: Sparkles, agent: Bot, state: Layers, queue: ListOrdered }

const skillsByName = new Map(skillGroups.flatMap((group) => group.skills).map((s) => [s.name, s]))

// A skill's brand logo in colour, or a generic icon for skills without one. Also takes a plain
// name (such as a project's tech) and looks it up in the skill list.
export function SkillLogo({ skill, className }: { skill: Skill | string; className: string }) {
  const resolved = typeof skill === 'string' ? (skillsByName.get(skill) ?? { name: skill }) : skill
  if (resolved.brand) return <BrandIcon slug={resolved.brand} colored className={className} />
  const Icon = resolved.ui ? uiIcons[resolved.ui] : Sparkles
  return <Icon aria-hidden className={`text-accent ${className}`} strokeWidth={1.5} />
}
