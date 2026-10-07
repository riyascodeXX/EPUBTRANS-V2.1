import { pageMetadata } from '@/lib/seo'
import Link from '@/components/i18n/LocalizedLink'
import { listContent } from '@/lib/content'
import { PageHero, ContentCTA } from '@/components/editorial/Primitives'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({
  title: 'Our Work',
  description: 'Explore publishing and learning samples in the EPUBTRANS portfolio.',
})

export default async function Work() {
  const cases = (await listContent('case-studies')).filter((doc) => doc.permissionConfirmed)
  return (
    <main>
      <PageHero
        eyebrow="OUR WORK"
        title="The craft behind the content."
        description="Explore publishing, eBook, desktop publishing and eLearning sample categories from our existing portfolio."
      />
      <section className="et-container et-content-section">
        <h2>Explore the original portfolio.</h2>
        <p className="et-lead">
          Our V1 portfolio includes learning, EPUB, DTP and typesetting examples. Visit the original
          sample collection while approved work is brought into the new experience.
        </p>
        <a
          className="et-text-link"
          href="https://www.epubtrans.com/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          View original portfolio ↗ <span className="sr-only">(opens in a new tab)</span>
        </a>
        {cases.map((doc) => (
          <Link className="et-content-row" key={doc.id} href={`/work/${doc.slug}`}>
            <h3>{doc.title}</h3>
            <span>Explore ↗</span>
          </Link>
        ))}
      </section>
      <ContentCTA />
    </main>
  )
}

