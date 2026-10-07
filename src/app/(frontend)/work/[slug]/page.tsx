import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/content'
import { PageHero, ContentCTA } from '@/components/editorial/Primitives'
import RichText from '@/components/RichText'
export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const doc = await getContent('case-studies', slug)
  return pageMetadata({
    title: doc?.title,
    description: doc?.description,
    alternates: { canonical: `/work/${slug}` },
  })
}
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const doc = await getContent('case-studies', slug)
  if (!doc?.permissionConfirmed) notFound()
  return (
    <main>
      <PageHero eyebrow="OUR WORK" title={doc.title} description={doc.description || undefined} />
      <article className="et-container et-content-section">
        {doc.content && <RichText data={doc.content} enableGutter={false} />}
        <ul className="et-content-list">
          {doc.outcomes?.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </article>
      <ContentCTA />
    </main>
  )
}
