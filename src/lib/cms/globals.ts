import type { GlobalSlug } from 'payload'

import { cached, getPayloadClient } from './client'

// Global tags match their slugs (PRD §7.6).
const getGlobal = <S extends GlobalSlug>(slug: S) =>
  cached(['global', slug], [slug], async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug, depth: 1 })
  })

export const getSiteSettings = () => getGlobal('site-settings')
export const getHero = () => getGlobal('hero')
export const getAbout = () => getGlobal('about')
export const getNow = () => getGlobal('now')
export const getUses = () => getGlobal('uses')
export const getSeoDefaults = () => getGlobal('seo-defaults')

// Server-only: includes the chatbot instructions. Pass only starterQuestions to client components.
export const getChatbotSettings = () => getGlobal('chatbot-settings')
