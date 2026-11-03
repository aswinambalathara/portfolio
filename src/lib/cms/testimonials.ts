import { cached, getPayloadClient } from './client'
import { TAGS } from './tags'

// Only testimonials marked visible are public (PRD §7.5).
export const getTestimonials = () =>
  cached(['testimonials'], [TAGS.testimonials], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'testimonials',
      where: { visible: { equals: true } },
      depth: 1,
      sort: 'order',
      pagination: false,
    })
    return docs
  })
