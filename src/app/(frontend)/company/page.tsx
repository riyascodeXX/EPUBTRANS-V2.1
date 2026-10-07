import { pageMetadata } from '@/lib/seo'
import { PageHero, ContentCTA, ArrowLink } from '@/components/editorial/Primitives'
export const metadata = pageMetadata({
  title: 'Company',
  description: 'Get to know EPUBTRANS, a technology-based publishing and localization company.',
  alternates: { canonical: '/company' },
})

export default function Company() {
  return (
    <main>
      <PageHero
        eyebrow="COMPANY / EPUBTRANS"
        title="Behind every edition, a human perspective."
        description="We bring publishing expertise and digital production together to shape content for new formats and audiences."
      />
      <section className="et-container et-detail-grid">
        <h2>Our story</h2>
        <div>
          <p className="et-lead">
            EPUBTRANS is a technology-based publishing company. Our capabilities connect project
            management, XML and data conversion, typesetting, ePublishing, eBooks, translation and
            learning localization.
          </p>
          <p style={{ marginTop: 24, lineHeight: 1.8 }}>
            Our work brings together language and production requirements across websites, learning
            modules, multimedia and publishing. We start with the content, the audience and the
            format it needs to reach.
          </p>
          <ArrowLink href="/services">Explore our capabilities</ArrowLink>
        </div>
      </section>
      <section className="et-company-home">
        <div className="et-container">
          <p className="et-label">OUR PURPOSE</p>
          <h2>
            Bring ideas to new formats.
            <br />
            <em>Bring cultures into conversation.</em>
          </h2>
          <div>
            <p>
              Our V1 company story describes a commitment to combining human expertise with
              technology and supporting communication across cultures and markets.
            </p>
            <ArrowLink href="/get-a-quote">Work with EPUBTRANS</ArrowLink>
          </div>
        </div>
      </section>
      <section className="et-container et-content-section">
        <p className="et-label">LET’S CONNECT</p>
        <h2>Start a conversation.</h2>
        <p className="et-lead">Chennai, India</p>
        <p>
          <a href="mailto:info@epubtrans.com">info@epubtrans.com</a>
          <br />
          <a href="tel:+914431363907">+91 44 3136 3907</a>
        </p>
        <ArrowLink href="/company/careers">Explore careers</ArrowLink>
      </section>
      <ContentCTA />
    </main>
  )
}
