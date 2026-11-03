import { ImageResponse } from 'next/og'

import { OgCard, ogSize } from '@/components/og-card'
import { getSiteSettings } from '@/lib/cms/globals'

export const dynamic = 'force-dynamic'
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Portfolio'

export default async function Image() {
  const settings = await getSiteSettings()
  return new ImageResponse(
    <OgCard
      eyebrow="Portfolio"
      title={settings.name ?? 'Portfolio'}
      subtitle={settings.title ?? settings.tagline ?? undefined}
    />,
    size,
  )
}
