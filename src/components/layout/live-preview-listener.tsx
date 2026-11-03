'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// FR-08: Payload's admin posts this message to the preview frame after each save,
// so the page re-renders with the latest draft.
export function LivePreviewListener() {
  const router = useRouter()

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (
        event.origin === window.location.origin &&
        event.data?.type === 'payload-document-event'
      ) {
        router.refresh()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [router])

  return null
}
