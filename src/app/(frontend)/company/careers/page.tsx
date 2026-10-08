import Link from '@/components/i18n/LocalizedLink'
import RichText from '@/components/RichText'
import { pageMetadata } from '@/lib/seo'
import { listContent, getSiteSettings } from '@/lib/content'
import { PageHero, ArrowLink } from '@/components/editorial/Primitives'
export const dynamic = 'force-dynamic'
export const metadata = pageMetadata({
  title: 'Careers',
  description:
    'Explore publishing, language and digital content careers with EPUBTRANS, and view published opportunities.',
  alternates: { canonical: '/company/careers' },
})

export default async function Careers() {
  const [careers, settings] = await Promise.all([listContent('careers'), getSiteSettings()])
  const email = settings.email || 'info@epubtrans.com'
  return (
    <main>
      <PageHero
        eyebrow="COMPANY / CAREERS"
        title="Your talent. Our next chapter."
        description="Bring your interest in words, languages and digital content to the conversation. Explore the work behind every EPUBTRANS edition."
      />
      <section id="life-at-epubtrans" className="et-container et-detail-grid et-company-section">
        <h2>Where craft meets possibility.</h2>
        <div>
          <p className="et-lead">
            Publishing connects people who care about language, design and detail. At EPUBTRANS,
            that work spans editorial production, localization and digital formats.
          </p>
          <p>
            Explore our capabilities to understand the kinds of projects we deliver, then check the
            published opportunities below.
          </p>
          <ArrowLink href="/services">Discover our work</ArrowLink>
        </div>
      </section>
      <section className="et-container et-content-section">
        <p className="et-label">EXPLORE THE DISCIPLINES</p>
        <h2>Different skills. A shared story.</h2>
        <div className="et-career-disciplines">
          {[
            [
              '01',
              'Editorial & publishing',
              'Copyediting, typesetting, indexing and eBook production.',
            ],
            [
              '02',
              'Language & localization',
              'Translation, multilingual desktop publishing and learning content.',
            ],
            [
              '03',
              'Digital & media',
              'Structured content, XML, graphics and multimedia production.',
            ],
          ].map(([number, title, description]) => (
            <article key={number}>
              <p className="et-label">{number}</p>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="open-roles" className="et-container et-content-section et-company-section">
        <p className="et-label">CURRENT OPPORTUNITIES</p>
        <h2>Find your next chapter.</h2>
        {careers.length ? (
          careers.map((role) => (
            <article key={role.id} className="et-content-row">
              <div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                <p>{[role.location, role.employmentType].filter(Boolean).join(' · ')}</p>
                {role.content && <RichText data={role.content} enableGutter={false} />}
                <a
                  className="et-text-link"
                  href={`mailto:${role.applicationEmail || email}?subject=${encodeURIComponent(`Career enquiry: ${role.title}`)}`}
                >
                  Ask about this role →
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="et-empty">
            <h3>No open roles published at the moment.</h3>
            <p>
              Check back for new opportunities. You can also contact our team to ask about future
              openings.
            </p>
          </div>
        )}
      </section>
      <section id="internships" className="et-container et-content-section et-company-section">
        <p className="et-label">INTERNSHIPS / EARLY CAREERS</p>
        <h2>Start with curiosity. Build your craft.</h2>
        <p className="et-lead">
          Interested in editorial work, languages or digital publishing? Contact our team to ask
          whether an internship opportunity is available in your area of interest.
        </p>
        <p>
          Include your course of study, relevant skills, preferred dates and any work samples.
          Availability, mentorship, duration and application requirements will be confirmed by the
          team.
        </p>
        <a
          className="et-text-link"
          href={`mailto:${email}?subject=${encodeURIComponent('Internship enquiry at EPUBTRANS')}`}
        >
          Enquire about internships →
        </a>
      </section>
      <section className="et-technology-home">
        <div className="et-container et-technology-grid">
          <div>
            <p className="et-label">START A CONVERSATION</p>
            <h2>
              Tell us what
              <br />
              you bring.
            </h2>
            <p>
              Introduce your area of expertise and the kind of work you’re looking for. Our team can
              confirm whether a relevant opportunity is available.
            </p>
            <a
              className="et-button et-button-light"
              href={`mailto:${email}?subject=${encodeURIComponent('Careers at EPUBTRANS')}`}
            >
              Contact the team ↗
            </a>
          </div>
          <div>
            <h3>A useful introduction includes</h3>
            <ul className="et-career-checklist">
              <li>Your skills and relevant experience</li>
              <li>The discipline or role you’re interested in</li>
              <li>Your location and availability</li>
              <li>A portfolio link, if relevant to your work</li>
            </ul>
            <p>Specific application requirements will be included with each published role.</p>
            <Link className="et-text-link" href="/company">
              Get to know EPUBTRANS →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
