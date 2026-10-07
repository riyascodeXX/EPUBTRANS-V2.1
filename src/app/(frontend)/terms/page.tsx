import { pageMetadata } from '@/lib/seo'
import { PageHero } from '@/components/editorial/Primitives'
export const metadata = pageMetadata({ title: 'Terms', robots: { index: false, follow: true } })

export default function Terms() {
  return (
    <main>
      <PageHero eyebrow="TERMS" title="Project terms, clearly defined." />
      <section className="et-container et-content-section">
        <p className="et-lead">
          Submitting a project request does not create a contract or confirm pricing, scope or a
          delivery date. These details are agreed separately with EPUBTRANS.
        </p>
        <div className="et-empty">
          <h2>Website terms awaiting review.</h2>
          <p>Approved website terms will be published here before public launch.</p>
        </div>
      </section>
    </main>
  )
}
