import { cached, getPayloadClient } from './client'
import { TAGS } from './tags'

export const getSkills = () =>
  cached(['skills'], [TAGS.skills], async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'skills',
      depth: 0,
      sort: 'order',
      pagination: false,
    })
    return docs
  })
