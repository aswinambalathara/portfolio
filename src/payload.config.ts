import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { ChatLogs } from './collections/ChatLogs'
import { Experience } from './collections/Experience'
import { Media } from './collections/Media'
import { Messages } from './collections/Messages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { ChatbotSettings } from './globals/ChatbotSettings'
import { Hero } from './globals/Hero'
import { Now } from './globals/Now'
import { SeoDefaults } from './globals/SeoDefaults'
import { SiteSettings } from './globals/SiteSettings'
import { Uses } from './globals/Uses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Projects,
    Experience,
    Skills,
    Posts,
    Testimonials,
    Media,
    Messages,
    ChatLogs,
    Users,
  ],
  globals: [SiteSettings, Hero, About, Now, Uses, SeoDefaults, ChatbotSettings],
  editor: lexicalEditor(),
  // The site reads through the Local API only (PRD §7.5).
  graphQL: { disable: true },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
