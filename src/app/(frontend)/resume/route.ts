import { after, NextResponse } from 'next/server'

import { getSiteSettings, incrementResumeDownloads } from '@/lib/cms/globals'
import { populated } from '@/lib/cms/media'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

// FR-70, FR-71: 302 to the latest résumé PDF and count the download after responding.
export async function GET() {
  const settings = await getSiteSettings()
  const resume = populated(settings.resume)
  if (!resume?.url) return new Response('Not found', { status: 404 })

  after(() =>
    incrementResumeDownloads().catch((error) => console.error('Résumé counter failed:', error)),
  )
  return NextResponse.redirect(new URL(resume.url, siteUrl), 302)
}
