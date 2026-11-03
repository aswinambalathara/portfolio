import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { getAdminUser } from '@/lib/cms/auth'
import { getProjectPreview } from '@/lib/cms/projects'

// FR-08: Live Preview. Only the logged-in admin can turn on draft mode.
export async function GET(request: NextRequest) {
  const draft = await draftMode()
  const { searchParams } = request.nextUrl

  if (searchParams.has('exit')) {
    draft.disable()
    redirect('/')
  }

  const user = await getAdminUser(request.headers)
  if (!user) return new Response('Log in to the admin panel to preview.', { status: 401 })

  const project = await getProjectPreview(searchParams.get('slug') ?? '')
  if (!project) return new Response('Project not found.', { status: 404 })

  draft.enable()
  // Redirect to the stored slug, never to a value from the query string.
  redirect(`/projects/${project.slug}`)
}
