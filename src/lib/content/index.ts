import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { CollectionSlug } from 'payload'
import { draftMode, headers } from 'next/headers'
export const contentPayload = cache(() => getPayload({ config }))
export const getSiteSettings = cache(async () => {
  const payload = await contentPayload()
  return payload.findGlobal({ slug: 'site-settings', overrideAccess: false })
})
export const listContent = cache(async <T extends CollectionSlug>(collection: T) => {
  const payload = await contentPayload()
  return (
    await payload.find({
      collection,
      overrideAccess: false,
      where: { status: { equals: 'published' } },
      depth: 1,
      pagination: false,
      sort: 'title',
    })
  ).docs
})
export const getContent = cache(async <T extends CollectionSlug>(collection: T, slug: string) => {
  const payload = await contentPayload()
  return (
    (
      await payload.find({
        collection,
        overrideAccess: false,
        where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
        depth: 1,
        limit: 1,
      })
    ).docs[0] ?? null
  )
})
export const getPreviewAccess = cache(async () => {
  const draft = await draftMode()
  if (!draft.isEnabled) return { draft: false, user: null }
  const payload = await contentPayload()
  const { user } = await payload.auth({ headers: await headers() })
  return { draft: Boolean(user), user }
})
export const getCMSPage = cache(async (slug: string) => {
  const payload = await contentPayload()
  const access = await getPreviewAccess()
  return (
    (
      await payload.find({
        collection: 'pages',
        overrideAccess: false,
        user: access.user,
        draft: access.draft,
        where: {
          and: [
            { slug: { equals: slug } },
            ...(!access.draft ? [{ _status: { equals: 'published' } }] : []),
          ],
        },
        depth: 2,
        limit: 1,
      })
    ).docs[0] ?? null
  )
})
export const getHomeContent = cache(() => getCMSPage('home'))
