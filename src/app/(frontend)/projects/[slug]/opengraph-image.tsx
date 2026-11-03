import { ImageResponse } from 'next/og'

import { OgCard, ogSize } from '@/components/og-card'
import { getProjectBySlug } from '@/lib/cms/projects'

export const dynamic = 'force-dynamic'
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Project'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return new ImageResponse(
    <OgCard
      eyebrow={project?.context === 'professional' ? 'Work project' : 'Project'}
      title={project?.title ?? 'Project'}
      subtitle={project?.summary}
    />,
    size,
  )
}
