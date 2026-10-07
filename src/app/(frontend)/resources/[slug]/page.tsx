import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Link from '@/components/i18n/LocalizedLink'
import { contentPayload, getPreviewAccess } from '@/lib/content'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageHero, ContentCTA } from '@/components/editorial/Primitives'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cache } from 'react'
const getPost = cache(async (slug: string) => {
  const p = await contentPayload()
  const access = await getPreviewAccess()
  return (
    await p.find({
      collection: 'posts',
      overrideAccess: false,
      user: access.user,
      draft: access.draft,
      where: {
        and: [
          { slug: { equals: slug } },
          ...(!access.draft ? [{ _status: { equals: 'published' } }] : []),
        ],
      },
      limit: 1,
      depth: 1,
    })
  ).docs[0]
})
type Props = { params: Promise<{ slug: string }> }
export const dynamic = 'force-dynamic'
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  return pageMetadata({
    title: post?.meta?.title || post?.title,
    description: post?.meta?.description,
    alternates: { canonical: `/resources/${slug}` },
  })
}
export default async function Article({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { draft } = await getPreviewAccess()
  return (
    <main>
      {draft && <LivePreviewListener />}
      <nav className="et-container et-breadcrumb" aria-label="Breadcrumb">
        <Link href="/resources">Resources</Link>
        <span>/</span>
        <span aria-current="page">{post.title}</span>
      </nav>
      <PageHero
        eyebrow="RESOURCE / ARTICLE"
        title={post.title}
        description={post.meta?.description || undefined}
      />
      <article className="et-container et-content-section">
        {post.publishedAt && (
          <p className="et-label">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </time>
          </p>
        )}
        {post.heroImage && typeof post.heroImage === 'object' && (
          <Media resource={post.heroImage} size="100vw" />
        )}
        <RichText data={post.content} enableGutter={false} />
      </article>
      <ContentCTA />
    </main>
  )
}
