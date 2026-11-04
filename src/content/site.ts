// All site content lives here for now. When the CMS is added, this file is what gets replaced.
// TODO markers show values that still need real details before launch.

export type Social = { platform: 'github' | 'linkedin'; href: string }

// `brand` is a Simple Icons slug (shown in the brand colour); `ui` is a generic icon for skills
// without a logo.
export type Skill = {
  name: string
  brand?: string
  ui?: 'api' | 'llm' | 'agent' | 'state' | 'queue' | 'realtime' | 'trace' | 'database' | 'cloud'
}

export type SkillGroup = { title: string; skills: Skill[] }

export type Project = {
  slug: string
  title: string
  summary: string
  context: 'work' | 'personal'
  status: 'live' | 'in-progress' | 'completed'
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

  email: 'aswinnairtm@gmail.com',
  // The Contact page chat posts here: the n8n "Portfolio AI Chatbot" workflow, which answers from
  // the résumé and forwards contact requests. Public by design; n8n only allows this site's origins.
  chatUrl: 'https://n8n.aswin-ambalathara.space/webhook/portfolio-chat',
  // TODO: put the résumé at public/resume.pdf, then set this to '/resume.pdf'. Empty hides the buttons.
  resumeUrl: '',
  avatarUrl: '/avatar.jpg',
  // TODO: LinkedIn URL. Entries with an empty href are hidden.
  socials: [
    { platform: 'github', href: 'https://github.com/aswinambalathara' },
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
      { name: 'Redux', brand: 'redux' },
      { name: 'Zustand', ui: 'state' },
      { name: 'shadcn/ui', brand: 'shadcnui' },
      { name: 'Material UI', brand: 'mui' },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', brand: 'nodedotjs' },
      { name: 'Express', brand: 'express' },
      { name: 'FastAPI', brand: 'fastapi' },
      { name: 'REST APIs', ui: 'api' },
      { name: 'WebSockets', ui: 'realtime' },
      { name: 'BullMQ', ui: 'queue' },
      { name: 'Celery', brand: 'celery' },
      { name: 'Razorpay', brand: 'razorpay' },
    ],
  },
  {
    title: 'AI & Agents',
    skills: [
      { name: 'LLM APIs', ui: 'llm' },
      { name: 'Agentic Workflows', ui: 'agent' },
      { name: 'n8n', brand: 'n8n' },
      { name: 'LangChain', brand: 'langchain' },
      { name: 'LangGraph', brand: 'langgraph' },
      { name: 'LangSmith', ui: 'trace' },
      { name: 'MCP', brand: 'modelcontextprotocol' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', brand: 'mongodb' },
      { name: 'PostgreSQL', brand: 'postgresql' },
      { name: 'Redis', brand: 'redis' },
      { name: 'Pinecone', ui: 'database' },
      { name: 'Qdrant', brand: 'qdrant' },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', brand: 'docker' },
      { name: 'AWS', ui: 'cloud' },
      { name: 'Git', brand: 'git' },
      { name: 'GitHub Actions', brand: 'githubactions' },
      { name: 'Linux', brand: 'linux' },
      { name: 'Postman', brand: 'postman' },
      { name: 'Jira', brand: 'jira' },
      { name: 'Figma', brand: 'figma' },
      { name: 'Cursor', brand: 'cursor' },
      { name: 'Claude Code', brand: 'claude' },
    ],
  },
]

// Projects from github.com/aswinambalathara, newest first. Tethr is the current project.
export const projects: Project[] = [
  {
    slug: 'tethr',
    title: 'Tethr',
    summary:
      'A developer contribution ledger that logs work from your AI coding IDE over MCP and syncs daily tables, weekly summaries and monthly appraisal dossiers to Google Docs.',
    context: 'personal',
    status: 'live',
    role: 'Solo developer: product, frontend, backend and MCP server',
    timeline: 'Sep 2026 – present',
    tech: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Python',
      'MongoDB',
      'MCP',
      'Gemini',
      'Clerk',
      'Google Docs API',
    ],
    overview:
      'Tethr records every contribution as Contribution → Outcome → Evidence: what you did, the impact it had, and proof such as a PR, commit or ticket. Entries come straight from AI coding IDEs (Cursor, Claude Code, Antigravity, Windsurf) through the Model Context Protocol, or from a web dashboard, and are written to a connected Google Doc.',
    problem:
      'Before a performance review, developers dig through months of git history, closed PRs and chat threads to remember what they shipped and why it mattered. A vague work diary does not hold up, and nobody keeps one by hand.',
    features: [
      'FastMCP server with add_task, update_task, get_tasks and sync_docs tools, so the IDE assistant logs work from the code it just changed',
      'Three-tier Google Docs ledger: a 10-column daily contribution table, Saturday weekly summaries and month-end appraisal dossiers',
      'Gemini 2.0 Flash writes weekly and monthly summaries, with a template fallback that works offline or without an API key',
      'Custom MCP sign-in screen with silent Clerk session checks, loopback redirect and a copy-code fallback for IDEs',
      'Configurable sync cadence (real-time, end of day or weekly) with a cap on manual summary syncs',
      'Dashboard with impact table, Kanban view and starred career highlights for promotion packets',
    ],
    challenges:
      'Designing an OAuth-style authorization flow that works inside IDE MCP clients, with a loopback redirect and a manual-code fallback; verifying Clerk JWTs (RS256) in FastAPI; encrypting stored Google tokens with AES-256-GCM; and formatting structured tables reliably through the Google Docs batchUpdate API.',
    outcome:
      'Live, with the MCP tools, Google Docs sync and AI-written summaries running across a Next.js frontend and a FastAPI backend. New features are being added.',
    repoUrl: 'https://github.com/aswinambalathara/Tethr',
    liveUrl: 'https://tethr.aswin-ambalathara.space',
  },
  {
    slug: 'meet-grid',
    title: 'Meet Grid',
    summary:
      'An event management platform with separate user and admin apps, built on a layered TypeScript backend.',
    context: 'personal',
    status: 'in-progress',
    role: 'Solo developer: frontend and backend',
    timeline: 'Oct 2024 – present',
    tech: ['Next.js', 'TypeScript', 'Express', 'Node.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
    overview:
      'Meet Grid lets people discover and manage events, while admins manage users and event categories. The Next.js frontend talks to an Express and TypeScript API organised with the repository pattern.',
    problem:
      'Event apps mix user, admin and data-access logic quickly. The goal was a clean, layered backend that stays easy to extend as features grow.',
    features: [
      'User and admin areas with separate authentication and routes',
      'Sign-in with email or Google (Passport OAuth 2.0), with JWT cookies',
      'Event categories, event listings and user management for admins',
      'Location search and maps with Mapbox, and image upload and cropping with Cloudinary',
      'Forms validated with React Hook Form and Zod on the client and Joi on the server',
    ],
    challenges:
      'Keeping the backend layered (routes, controllers, services, repositories) so business logic never talks to Mongoose directly, and sharing typed interfaces between the API and the Next.js app.',
    outcome:
      'The user and admin foundations are built: authentication, event categories, listings and user management on a layered backend. The remaining features are next.',
    repoUrl: 'https://github.com/aswinambalathara/Meet_Grid',
  },
  {
    slug: 'holahaute',
    title: 'Holahaute',
    summary:
      'A full e-commerce store with a customer shop, admin dashboard, Razorpay payments and sales reports.',
    context: 'personal',
    status: 'completed',
    role: 'Solo developer: full stack',
    timeline: 'Feb 2024 – Mar 2025',
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Razorpay', 'JavaScript'],
    overview:
      'Holahaute is a server-rendered online store built with Express, MongoDB and EJS. Customers browse, add to cart or wishlist and pay online; admins manage the catalogue, offers and orders from a dashboard.',
    problem:
      'A real shop needs much more than a product list: accounts, carts, offers, payments, order tracking and reporting for the owner.',
    features: [
      'Product, category, banner, offer and coupon management in an admin dashboard',
      'Cart, wishlist, wallet, addresses, ratings and order history for customers',
      'Online payments with Razorpay',
      'Email OTP verification and Google sign-in',
      'Sales reports exported to Excel and PDF, and image cropping for product photos',
    ],
    challenges:
      'Keeping cart totals, coupons, offers and wallet balances consistent through checkout and payment, and generating downloadable sales reports on the server.',
    outcome:
      'Completed, covering the full shop and admin workflow from browsing to payment and reporting.',
    repoUrl: 'https://github.com/aswinambalathara/Holahaute',
  },
]
