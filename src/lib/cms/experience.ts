import { cached, getPayloadClient } from './client'
import { TAGS } from './tags'

// FR-40: newest role first.
export const getExperience = () =>
  cached(['experience'], [TAGS.experience], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'experience',
      depth: 1,
      sort: '-startDate',
      pagination: false,
    })
    return docs
  })
