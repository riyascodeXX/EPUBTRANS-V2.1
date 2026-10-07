import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getIndustries = cache(async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'industries',
    where: { status: { equals: 'published' } },
    overrideAccess: false,
    pagination: false,
    depth: 0,
    sort: 'createdAt',
  })
  return docs
})

export const getIndustry = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'industries',
    where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
    overrideAccess: false,
    limit: 1,
    depth: 0,
  })
  return docs[0] ?? null
})
