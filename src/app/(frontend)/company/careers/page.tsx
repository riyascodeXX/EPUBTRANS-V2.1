import { pageMetadata } from '@/lib/seo'
import { listContent } from '@/lib/content'
import { PageHero } from '@/components/editorial/Primitives'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({ title: 'Careers' })

export default async function Careers() {
  const careers = await listContent('careers')
  return (
    <main>
      <PageHero
        eyebrow="CAREERS"
        title="Make your next chapter matter."
        description="Explore published opportunities with EPUBTRANS."
      />
      <section className="et-container et-content-section">
        {careers.length ? (
          careers.map((role) => (
            <article key={role.id} className="et-content-row">
              <div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                <p>
                  {role.location} · {role.employmentType}
                </p>
                {role.applicationEmail && (
                  <a
                    className="et-text-link"
                    href={`mailto:${role.applicationEmail}?subject=${encodeURIComponent(role.title)}`}
                  >
                    Ask about this role →
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="et-empty">
            <h2>No open roles published at the moment.</h2>
            <p>New opportunities will appear here as they become available.</p>
            <a className="et-text-link" href="mailto:info@epubtrans.com">
              Contact EPUBTRANS →
            </a>
          </div>
        )}
      </section>
    </main>
  )
}
