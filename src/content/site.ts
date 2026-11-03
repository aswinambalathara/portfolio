// All site content lives here for now. When the CMS is added, this file is what gets replaced.
// TODO markers show values that still need real details before launch.

export type Social = { platform: 'github' | 'linkedin'; href: string }

// `brand` is a Simple Icons slug (shown in the brand colour); `ui` is a generic icon for skills
// without a logo.
export type Skill = { name: string; brand?: string; ui?: 'api' | 'llm' | 'agent' }

export type SkillGroup = { title: string; skills: Skill[] }

export type Project = {
  slug: string
  title: string
  summary: string
  context: 'work' | 'personal'
  status: 'live' | 'in-progress'
  role: string
  timeline: string
  tech: string[]
  overview: string
  problem: string
  features: string[]
  challenges: string
  outcome: string
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
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', brand: 'javascript' },
      { name: 'TypeScript', brand: 'typescript' },
      { name: 'Python', brand: 'python' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', brand: 'react' },
      { name: 'Next.js', brand: 'nextdotjs' },
      { name: 'Tailwind CSS', brand: 'tailwindcss' },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', brand: 'nodedotjs' },
      { name: 'Express', brand: 'express' },
      { name: 'REST APIs', ui: 'api' },
    ],
  },
  {
    title: 'AI & Agents',
    skills: [
      { name: 'LLM APIs', ui: 'llm' },
      { name: 'Agentic Workflows', ui: 'agent' },
    ],
  },
  {
    title: 'Databases',
    skills: [{ name: 'MongoDB', brand: 'mongodb' }],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', brand: 'docker' },
      { name: 'Git', brand: 'git' },
      { name: 'GitHub Actions', brand: 'githubactions' },
      { name: 'Linux', brand: 'linux' },
    ],
  },
]

// TODO: replace these sample projects with real ones. Every text field below is a placeholder.
export const projects: Project[] = [
  {
    slug: 'ai-agent-workflow-platform',
    title: 'AI Agent Workflow Platform',
    summary:
      'Sample project: an internal AI agent that automates a multi-step business workflow with tool calling and LLMs.',
    context: 'work',
    status: 'live',
    role: 'Sample role: designed and built the agent and its tool integrations',
    timeline: 'Sample timeline',
    tech: ['Python', 'LLM APIs', 'Agentic Workflows'],
    overview: 'Sample overview: what the project is, who uses it and why it exists.',
    problem: 'Sample problem: the manual process this replaced and why it was slow or error-prone.',
    features: [
      'Sample feature: what the agent does on its own',
      'Sample feature: which tools or systems it connects to',
      'Sample feature: how people review or approve its work',
    ],
    challenges: 'Sample challenges: the hardest technical problems and how they were solved.',
    outcome: 'Sample outcome: the measurable result, such as time saved or errors reduced.',
    confidential: true,
  },
  {
    slug: 'full-stack-web-app',
    title: 'Full-Stack Web App',
    summary: 'Sample project: a MERN application built end to end, from API design to deployment.',
    context: 'personal',
    status: 'live',
    role: 'Sample role: solo developer',
    timeline: 'Sample timeline',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    overview: 'Sample overview: what the app does and who it is for.',
    problem: 'Sample problem: the need this app answers.',
    features: [
      'Sample feature: the main thing a user can do',
      'Sample feature: authentication or accounts',
      'Sample feature: an interesting technical detail',
    ],
    challenges: 'Sample challenges: what was hard and what was learned.',
    outcome: 'Sample outcome: who uses it, or what it proved.',
  },
  {
    slug: 'agentic-chatbot',
    title: 'Agentic Chatbot',
    summary: 'Sample project: a chatbot that uses tools to answer questions and take actions.',
    context: 'personal',
    status: 'in-progress',
    role: 'Sample role: solo developer',
    timeline: 'Sample timeline',
    tech: ['Next.js', 'TypeScript', 'LLM APIs'],
    overview: 'Sample overview: what the chatbot helps with.',
    problem: 'Sample problem: why a tool-using chatbot was needed.',
    features: [
      'Sample feature: streaming answers',
      'Sample feature: tools the chatbot can call',
      'Sample feature: how answers stay grounded',
    ],
    challenges: 'Sample challenges: reliability, prompts or tool design.',
    outcome: 'Sample outcome: what works today and what is next.',
  },
  {
    slug: 'workflow-automation-agents',
    title: 'Workflow Automation Agents',
    summary: 'Sample project: a set of cooperating agents that automate a repetitive task.',
    context: 'personal',
    status: 'in-progress',
    role: 'Sample role: solo developer',
    timeline: 'Sample timeline',
    tech: ['Python', 'Agentic Workflows'],
    overview: 'Sample overview: the task these agents automate.',
    problem: 'Sample problem: why doing it by hand did not scale.',
    features: [
      'Sample feature: how the agents split the work',
      'Sample feature: how they hand off to each other',
      'Sample feature: how failures are handled',
    ],
    challenges: 'Sample challenges: coordination between agents.',
    outcome: 'Sample outcome: current status and next steps.',
  },
]
