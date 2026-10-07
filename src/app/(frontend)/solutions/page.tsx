import { pageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { listContent } from '@/lib/content'
import { ContentCTA, PageHero } from '@/components/editorial/Primitives'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({
  title: 'Solutions',
  description: 'Explore connected digital publishing solutions from EPUBTRANS.',
  alternates: { canonical: '/solutions' },
})

export default async function SolutionsPage() {
  const documents = await listContent('solutions')
  return (
    <main>
      <PageHero
        eyebrow="SOLUTIONS"
        title="Connect the whole content journey."
        description="Bring your content requirements together. Explore solutions built around publication, format and audience."
      />
      <section className="et-container et-content-section">
        {documents.map((doc) => (
          <Link key={doc.id} className="et-content-row" href={`/solutions/${doc.slug}`}>
            <div>
              <p className="et-label">SOLUTION</p>
              <h3>{doc.title}</h3>
              <p>{doc.shortDescription}</p>
            </div>
            <span>Explore ↗</span>
          </Link>
        ))}
      </section>
      <ContentCTA />
    </main>
  )
}
