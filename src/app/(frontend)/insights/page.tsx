import { pageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { contentPayload } from '@/lib/content'
import { PageHero, ContentCTA } from '@/components/editorial/Primitives'
import RichText from '@/components/RichText'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({
  title: 'Insights',
  description: 'Published perspectives, guides and news from EPUBTRANS.',
  alternates: { canonical: '/insights' },
})

export default async function Insights({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[]
    page?: string | string[]
    category?: string | string[]
  }>
}) {
  const params = await searchParams
  const q = (typeof params.q === 'string' ? params.q : '').slice(0, 120)
  const category =
    typeof params.category === 'string' && /^\d+$/.test(params.category) ? params.category : ''
  const currentPage = Math.floor(Math.max(1, Math.min(1000, Number(params.page) || 1)))
  const payload = await contentPayload()
  const categories = await payload.find({
    collection: 'categories',
    overrideAccess: false,
    pagination: false,
    sort: 'title',
  })
  const resources = await payload.find({
    collection: 'resources',
    overrideAccess: false,
    limit: 12,
    depth: 1,
    sort: 'title',
    where: {
      and: [{ status: { equals: 'published' } }, ...(q ? [{ title: { contains: q } }] : [])],
    },
  })
  const posts = await payload.find({
    collection: 'posts',
    overrideAccess: false,
    draft: false,
    depth: 1,
    limit: 8,
    page: currentPage,
    sort: '-publishedAt',
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(q ? [{ title: { contains: q } }] : []),
        ...(category ? [{ categories: { contains: Number(category) } }] : []),
      ],
    },
  })
  return (
    <main>
      <PageHero
        eyebrow="INSIGHTS"
        title="The next perspective."
        description="Ideas, guides and thinking across publishing, language and digital content."
      />
      <section className="et-container et-content-section">
        <form action="/insights" className="et-search-form">
          <label htmlFor="insight-search">Search insights</label>
          <div>
            <input
              name="q"
              id="insight-search"
              defaultValue={q}
              maxLength={120}
              placeholder="Publishing, language, learning…"
            />
            <label htmlFor="insight-category" className="sr-only">
              Filter by category
            </label>
            <select
              name="category"
              id="insight-category"
              defaultValue={category}
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {categories.docs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button className="et-button" type="submit">
              Search →
            </button>
          </div>
        </form>
        {posts.docs.length ? (
          <div className="et-content-list">
            {posts.docs.map((post) => (
              <Link className="et-content-row" key={post.id} href={`/insights/${post.slug}`}>
                <div>
                  <p className="et-label">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'PERSPECTIVE'}
                  </p>
                  <h3>{post.title}</h3>
                  <p>{post.meta?.description}</p>
                </div>
                <span>Read ↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="et-empty">
            <h2>
              {q || category ? 'No matching perspectives.' : 'Our next chapter is taking shape.'}
            </h2>
            <p>
              {q || category
                ? 'Try a different search, or explore our service library.'
                : 'Published perspectives will appear here. Meanwhile, explore the publishing and localization capabilities behind your next project.'}
            </p>
            <Link className="et-text-link" href={q || category ? '/insights' : '/services'}>
              {q || category ? 'Clear filters' : 'Explore services'} →
            </Link>
          </div>
        )}
        <nav className="et-pagination" aria-label="Insights pages">
          {posts.hasPrevPage && (
            <Link
              href={`/insights?q=${encodeURIComponent(q)}&category=${category}&page=${currentPage - 1}`}
            >
              ← Previous
            </Link>
          )}
          {posts.totalPages > 1 && (
            <span>
              Page {currentPage} of {posts.totalPages}
            </span>
          )}
          {posts.hasNextPage && (
            <Link
              href={`/insights?q=${encodeURIComponent(q)}&category=${category}&page=${currentPage + 1}`}
            >
              Next →
            </Link>
          )}
        </nav>
        {!!resources.docs.length && (
          <section className="et-content-section">
            <p className="et-label">RESOURCES</p>
            <h2>For your next project.</h2>
            {resources.docs.map((resource) => (
              <article key={resource.id} className="et-content-section">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                {resource.content && <RichText data={resource.content} enableGutter={false} />}{' '}
                {typeof resource.file === 'object' && resource.file?.url && (
                  <Link className="et-text-link" href={resource.file.url}>
                    Download resource →
                  </Link>
                )}
              </article>
            ))}
          </section>
        )}
      </section>
      <ContentCTA />
    </main>
  )
}
