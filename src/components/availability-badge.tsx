import { PulseDot } from '@/components/ui/status-badge'
import type { SiteSetting } from '@/payload-types'

// FR-11: hidden when availability is closed or has no text.
export function AvailabilityBadge({ availability }: { availability: SiteSetting['availability'] }) {
  if (!availability?.isOpen || !availability.text) return null
  return (
    <p className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
      <PulseDot />
      {availability.text}
    </p>
  )
}
