import { pageMetadata } from '@/lib/seo'
import Link from '@/components/i18n/LocalizedLink'
import { listContent } from '@/lib/content'
import { ContentCTA, PageHero } from '@/components/editorial/Primitives'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({
  title: 'Industries',
  description: 'Explore content requirements for academic publishers, journals and global brands.',
  alternates: { canonical: '/industries' },
})

export default async function IndustriesPage() {
  const documents = await listContent('industries')
  return (
    <main>
      <PageHero
        eyebrow="INDUSTRIES"
        title="Your context. Our starting point."
        description="Different audiences. Different content requirements. Define a publishing or localization scope around your industry."
      />
      <section className="et-container et-content-section">
        {documents.length ? (
          documents.map((doc) => (
            <Link key={doc.id} className="et-content-row" href={`/industries/${doc.slug}`}>
              <div>
                <h3>{doc.title}</h3>
                <p>{doc.shortDescription}</p>
              </div>
              <span>Explore ↗</span>
            </Link>
          ))
        ) : (
          <>
            <h2>Start with the content that matters.</h2>
            <ul className="et-content-list">
              <li>
                <h3>Academic publishing & journals</h3>
                <p>Explore copyediting, typesetting, XML and digital publishing requirements.</p>
              </li>
              <li>
                <h3>Learning & education</h3>
                <p>Discuss eLearning localization, multimedia and learning content formats.</p>
              </li>
              <li>
                <h3>Global brands & business content</h3>
                <p>Discuss translation, multilingual publishing and communication requirements.</p>
              </li>
            </ul>
            <p className="et-label" style={{ marginTop: 24 }}>
              Industry perspectives will appear here as they are published.
            </p>
          </>
        )}
      </section>
      <ContentCTA />
    </main>
  )
}

