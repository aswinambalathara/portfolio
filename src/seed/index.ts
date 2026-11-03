// Idempotent seed (PRD §7.7). Run with `pnpm seed`.
// Existing documents are left untouched, and globals are only filled while still empty.
import { getPayload } from 'payload'
import type {
  CollectionSlug,
  DataFromGlobalSlug,
  GlobalSlug,
  RequiredDataFromCollectionSlug,
  Where,
} from 'payload'

import config from '../payload.config'

// revalidateTag() is unavailable outside a Next.js request.
const context = { skipRevalidate: true }

const payload = await getPayload({ config })

async function findOrCreate<S extends CollectionSlug>(
  collection: S,
  where: Where,
  data: RequiredDataFromCollectionSlug<S>,
) {
  const { docs } = await payload.find({ collection, where, limit: 1, depth: 0 })
  if (docs[0]) {
    payload.logger.info(`seed: ${collection} exists, skipped`)
    return docs[0]
  }
  const doc = await payload.create({ collection, data, context })
  payload.logger.info(`seed: ${collection} created`)
  return doc
}

async function fillGlobalIfEmpty<S extends GlobalSlug>(
  slug: S,
  isEmpty: (doc: DataFromGlobalSlug<S>) => boolean,
  fill: () => Promise<unknown>,
) {
  const doc = (await payload.findGlobal({ slug, depth: 0 })) as DataFromGlobalSlug<S>
  if (!isEmpty(doc)) {
    payload.logger.info(`seed: ${slug} has content, skipped`)
    return
  }
  await fill()
  payload.logger.info(`seed: ${slug} filled`)
}

const locations = ['Remote', 'Kerala', 'Bengaluru', 'Chennai', 'Dubai']

await fillGlobalIfEmpty(
  'site-settings',
  (doc) => !doc.name,
  () =>
    payload.updateGlobal({
      slug: 'site-settings',
      context,
      data: {
        name: 'Aswin Nair T M',
        title: 'Full-Stack Developer · AI Agents',
        tagline: 'I build full-stack web apps and the AI agents that power them.',
        // {{EMAIL}} fails the email field's validation, so a valid placeholder is used.
        email: 'placeholder@example.com',
        location: 'Trivandrum, Kerala, India',
        socials: [
          { platform: 'GitHub', url: 'https://github.com/{{GITHUB_USERNAME}}' },
          { platform: 'LinkedIn', url: '{{LINKEDIN_URL}}' },
        ],
        availability: {
          isOpen: true,
          text: `Open to roles · ${locations.join(' / ')}`,
          locations,
        },
        flags: {
          blogEnabled: false,
          chatbotEnabled: false,
          githubStatsEnabled: false,
          testimonialsEnabled: false,
          nowEnabled: false,
          usesEnabled: false,
        },
      },
    }),
)

await fillGlobalIfEmpty(
  'hero',
  (doc) => !doc.heading,
  () =>
    payload.updateGlobal({
      slug: 'hero',
      context,
      data: {
        heading: "Hi, I'm Aswin.",
        subheading: 'I build full-stack web apps and the AI agents that power them.',
        intro:
          'Full-Stack Developer (MERN · Next.js) with 2 years of experience, currently building agentic workflows with Python and LLMs. Based in Trivandrum, open to remote roles and opportunities in Kerala, Bengaluru, Chennai and Dubai.',
        primaryCta: { label: 'Download résumé', href: '/resume' },
        secondaryCta: { label: "Let's talk", href: '/contact' },
      },
    }),
)

await fillGlobalIfEmpty(
  'chatbot-settings',
  (doc) => !doc.starterQuestions?.length,
  () =>
    payload.updateGlobal({
      slug: 'chatbot-settings',
      context,
      data: {
        instructions:
          "Placeholder: you are Ask Aswin, an assistant that answers questions about Aswin's work, projects, skills and availability.",
        starterQuestions: [
          'What AI agents has Aswin built at work?',
          "What's his tech stack?",
          'Is he open to relocation?',
          'How can I contact him?',
        ],
        dailyLimit: 300,
      },
    }),
)

const skillSeeds = [
  { name: 'React', group: 'frontend', icon: 'react' },
  { name: 'Next.js', group: 'frontend', icon: 'nextdotjs' },
  { name: 'TypeScript', group: 'frontend', icon: 'typescript' },
  { name: 'JavaScript', group: 'frontend', icon: 'javascript' },
  { name: 'Tailwind CSS', group: 'frontend', icon: 'tailwindcss' },
  { name: 'Node.js', group: 'backend', icon: 'nodedotjs' },
  { name: 'Express', group: 'backend', icon: 'express' },
  { name: 'REST APIs', group: 'backend' },
  { name: 'Python', group: 'ai', icon: 'python' },
  { name: 'LLM APIs', group: 'ai' },
  { name: 'AI agent frameworks', group: 'ai' },
  { name: 'MongoDB', group: 'database', icon: 'mongodb' },
  { name: 'Docker', group: 'devops', icon: 'docker' },
  { name: 'Git', group: 'devops', icon: 'git' },
  { name: 'GitHub Actions', group: 'devops', icon: 'githubactions' },
  { name: 'Linux', group: 'devops', icon: 'linux' },
] as const

const skillIds: Record<string, string> = {}
for (const [index, skill] of skillSeeds.entries()) {
  const doc = await findOrCreate(
    'skills',
    { name: { equals: skill.name } },
    { ...skill, order: index + 1 },
  )
  skillIds[skill.name] = doc.id
}
const skills = (...names: string[]) => names.map((name) => skillIds[name])

const experience = await findOrCreate(
  'experience',
  { company: { equals: 'Company name (placeholder)' } },
  {
    company: 'Company name (placeholder)',
    role: 'Full-Stack Developer',
    employmentType: 'full-time',
    location: 'Trivandrum, Kerala',
    remote: false,
    startDate: '2024-11-01T00:00:00.000Z',
    isCurrent: true,
    highlights: [
      {
        text: 'Placeholder: built and shipped full-stack features with the MERN stack and Next.js.',
      },
      { text: 'Placeholder: building AI agents and agentic workflows with Python and LLMs.' },
    ],
    skills: skills('React', 'Next.js', 'Node.js', 'MongoDB', 'Python', 'LLM APIs'),
    order: 1,
  },
)

await findOrCreate(
  'projects',
  { slug: { equals: 'ai-agent-workflow-platform' } },
  {
    title: 'AI Agent Workflow Platform',
    slug: 'ai-agent-workflow-platform',
    summary: 'Placeholder: an internal AI agent that automates a multi-step business workflow.',
    context: 'professional',
    experience: experience.id,
    confidential: true,
    status: 'live',
    featured: true,
    order: 1,
    categories: ['ai-agents', 'backend'],
    skills: skills('Python', 'LLM APIs', 'AI agent frameworks'),
    problem: 'Placeholder: a manual, multi-step process that slowed the team down.',
    role: 'Placeholder: designed and built the agent and its tool integrations.',
    outcomes: [{ text: 'Placeholder: measurable time saved per task.' }],
    // Seeded only so the confidential filter (FR-26) can be verified. These must never render.
    repoUrl: 'https://example.com/confidential-repo-must-not-render',
    demoUrl: 'https://example.com/confidential-demo-must-not-render',
    _status: 'published',
  },
)

await findOrCreate(
  'projects',
  { slug: { equals: 'full-stack-web-app' } },
  {
    title: 'Full-Stack Web App',
    slug: 'full-stack-web-app',
    summary: 'Placeholder: a live MERN application built end to end.',
    context: 'personal',
    status: 'live',
    featured: true,
    order: 2,
    categories: ['full-stack'],
    skills: skills('React', 'Node.js', 'Express', 'MongoDB'),
    repoUrl: 'https://github.com/{{GITHUB_USERNAME}}/full-stack-web-app',
    _status: 'published',
  },
)

await findOrCreate(
  'projects',
  { slug: { equals: 'agentic-chatbot' } },
  {
    title: 'Agentic Chatbot',
    slug: 'agentic-chatbot',
    summary: 'Placeholder: a chatbot that uses tools to answer questions and take actions.',
    context: 'personal',
    status: 'in-progress',
    featured: true,
    order: 3,
    categories: ['ai-agents', 'full-stack'],
    skills: skills('Next.js', 'TypeScript', 'LLM APIs'),
    progressNote: 'Placeholder: working on tool calling and streaming responses.',
    _status: 'published',
  },
)

await findOrCreate(
  'projects',
  { slug: { equals: 'agentic-workflow-automation' } },
  {
    title: 'Agentic Workflow Automation',
    slug: 'agentic-workflow-automation',
    summary: 'Placeholder: a multi-agent workflow that automates a repetitive task.',
    context: 'personal',
    status: 'in-progress',
    featured: false,
    order: 4,
    categories: ['ai-agents', 'tooling'],
    skills: skills('Python', 'AI agent frameworks'),
    progressNote: 'Placeholder: prototyping agent hand-offs.',
    _status: 'published',
  },
)

payload.logger.info('seed: done')
process.exit(0)
