// Cache tags from PRD §7.6. Global tags match their global slugs.
export const TAGS = {
  siteSettings: 'site-settings',
  hero: 'hero',
  about: 'about',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  posts: 'posts',
  testimonials: 'testimonials',
  now: 'now',
  uses: 'uses',
  seoDefaults: 'seo-defaults',
  chatbotSettings: 'chatbot-settings',
  knowledgePack: 'knowledge-pack',
} as const

export const projectTag = (slug: string) => `project:${slug}`

export const postTag = (slug: string) => `post:${slug}`
