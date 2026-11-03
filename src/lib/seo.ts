import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

import { getSeoDefaults, getSiteSettings } from './cms/globals'
import { populated } from './cms/media'

type PageSeo = {
  title?: string | null
  description?: string | null
  image?: string | Media | null
  path: string
  type?: 'website' | 'article'
}

// NFR-10: page SEO fields first, then seo-defaults, then site settings.
export async function buildMetadata({
  title,
  description,
  image,
  path,
  type = 'website',
}: PageSeo): Promise<Metadata> {
  const [defaults, settings] = await Promise.all([getSeoDefaults(), getSiteSettings()])
  const resolvedDescription =
    description || defaults.metaDescription || settings.tagline || undefined
  const ogImage = populated(image) ?? populated(defaults.ogImage)
  const ogImageUrl = ogImage ? (ogImage.sizes?.og?.url ?? ogImage.url) : null

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    keywords: defaults.keywords ?? undefined,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: settings.name ?? undefined,
      title: title ?? defaults.metaTitle ?? settings.name ?? undefined,
      description: resolvedDescription,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}
