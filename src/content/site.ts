// All site content lives here for now. When the CMS is added, this file is what gets replaced.
// TODO markers show values that still need real details before launch.

export type Link = { label: string; href: string }

export type Social = { platform: 'github' | 'linkedin'; href: string }

export type SkillGroup = { title: string; skills: { name: string; icon?: string }[] }

export type Project = {
  title: string
  description: string
  context: 'work' | 'personal'
  status: 'live' | 'in-progress'
  tech: string[]
  // Work projects under NDA: links are never shown.
  confidential?: boolean
  repoUrl?: string
  liveUrl?: string
}

export const site = {
  name: 'Aswin Nair T M',
  firstName: 'Aswin',
  role: 'Full-Stack Developer · AI Agents',
  tagline: 'I build full-stack web apps and the AI agents that power them.',
  intro:
    'Full-stack developer (MERN · Next.js) with 2 years of experience, currently building agentic workflows with Python and LLMs. Based in Trivandrum, Kerala.',
  availability: 'Open to roles · Remote, Kerala, Bengaluru, Chennai, Dubai',
  url: 'https://portfolio.aswin-ambalathara.space',

  // TODO: real email address.
  email: 'hello@example.com',
  // TODO: put the résumé at public/resume.pdf, then set this to '/resume.pdf'. Empty hides the buttons.
  resumeUrl: '',
  // TODO: put a square photo at public/avatar.jpg, then set this to '/avatar.jpg'. Empty shows initials.
  avatarUrl: '',
  // TODO: real profile URLs. Entries with an empty href are hidden.
  socials: [
    { platform: 'github', href: '' },
    { platform: 'linkedin', href: '' },
  ] satisfies Social[] as Social[],
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express', icon: 'express' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'AI & Agents',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'LLM APIs' },
      { name: 'Agentic workflows' },
    ],
  },
  {
    title: 'Databases',
    skills: [{ name: 'MongoDB', icon: 'mongodb' }],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
]

// TODO: replace these sample projects with real ones.
export const projects: Project[] = [
  {
    title: 'AI Agent Workflow Platform',
    description:
      'Sample project: an internal AI agent that automates a multi-step business workflow with tool calling and LLMs.',
    context: 'work',
    status: 'live',
    tech: ['Python', 'LLM APIs', 'Agentic workflows'],
    confidential: true,
  },
  {
    title: 'Full-Stack Web App',
    description:
      'Sample project: a MERN application built end to end, from API design to deployment.',
    context: 'personal',
    status: 'live',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    title: 'Agentic Chatbot',
    description: 'Sample project: a chatbot that uses tools to answer questions and take actions.',
    context: 'personal',
    status: 'in-progress',
    tech: ['Next.js', 'TypeScript', 'LLM APIs'],
  },
  {
    title: 'Workflow Automation Agents',
    description: 'Sample project: a set of cooperating agents that automate a repetitive task.',
    context: 'personal',
    status: 'in-progress',
    tech: ['Python', 'Agentic workflows'],
  },
]
