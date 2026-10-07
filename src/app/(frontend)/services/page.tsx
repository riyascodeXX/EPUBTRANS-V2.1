import { pageMetadata } from '@/lib/seo'
import { listContent } from '@/lib/content'
import { ContentCTA, PageHero } from '@/components/editorial/Primitives'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({
  title: 'What We Do',
  description: 'Explore publishing, localization, media, learning and accessible content services.',
  alternates: { canonical: '/services' },
})

const groups = [
  ['publishing', 'Publishing & content', ['publishing']],
  ['language', 'Language & localization', ['translation', 'desktop-publishing']],
  ['media', 'Media & multimedia', ['voiceover', 'transcription', 'subtitling']],
  ['learning', 'Learning', ['elearning-localization']],
  ['accessibility', 'Accessibility', ['accessibility']],
] as const
export default async function ServicesPage() {
  const services = await listContent('services')
  return (
    <main>
      <PageHero
        eyebrow="WHAT WE DO"
        title="Content, in every dimension."
        description="From the first manuscript to the next audience. Explore the capabilities that connect your content to its possibilities."
      />
      {groups.map(([id, title, slugs]) => {
        const matches = services.filter((service) =>
          id === 'publishing'
            ? service.category === 'publishing'
            : slugs.some((slug) => slug === service.slug),
        )
        return (
          <section className="et-container et-content-section" id={id} key={id}>
            <p className="et-label">WHAT WE DO / {id}</p>
            <h2>{title}</h2>
            {matches.length ? (
              matches.map((service) => (
                <Link
                  className="et-content-row"
                  key={service.id}
                  href={`/services/${service.slug}`}
                >
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                  </div>
                  <span>Explore ↗</span>
                </Link>
              ))
            ) : (
              <div className="et-empty">
                <h3>Let’s discuss your requirements.</h3>
                <p>
                  Detailed service information is being prepared. Tell us about your content and the
                  scope you have in mind.
                </p>
                <Link className="et-text-link" href="/get-a-quote">
                  Discuss a project →
                </Link>
              </div>
            )}
          </section>
        )
      })}
      <ContentCTA />
    </main>
  )
}
