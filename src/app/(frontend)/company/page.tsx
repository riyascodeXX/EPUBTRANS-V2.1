import { pageMetadata } from '@/lib/seo'
import { PageHero, ContentCTA, ArrowLink } from '@/components/editorial/Primitives'

const companyTopics = [
  {
    label: 'ABOUT EPUBTRANS',
    title: 'The expertise behind your content.',
    items: [
      {
        id: 'why-epubtrans',
        title: 'Why EPUBTRANS',
        text: 'Publishing and localization often share the same challenges: preserving meaning, managing complex files and preparing content for its final audience. Our service portfolio brings editorial, language and digital production disciplines into the same conversation.',
      },
      {
        id: 'leadership',
        title: 'Leadership',
        text: 'A useful partnership starts with clear points of contact. Speak with our team about the people responsible for your project, delivery coordination and escalation before work begins.',
      },
    ],
  },
  {
    label: 'TRUST',
    title: 'Confidence starts with clear expectations.',
    items: [
      {
        id: 'certifications',
        title: 'Certifications',
        text: 'If your procurement process requires a specific certification, ask our team for current documentation and its scope. Certification requirements should be confirmed for the services in your brief.',
      },
      {
        id: 'quality',
        title: 'Quality',
        text: 'Copyediting, proofreading, typesetting and structured content services address different layers of quality. Define your style guide, output specifications and acceptance criteria with us when scoping a project.',
      },
      {
        id: 'security',
        title: 'Security',
        text: 'Discuss confidentiality, file access and transfer requirements before sharing sensitive material. Our team can review your project’s handling requirements and any proposed non-disclosure agreement.',
      },
      {
        id: 'compliance',
        title: 'Compliance',
        text: 'Accessibility, publishing specifications and regional requirements depend on the content and its destination. Share the standards your output must meet so that the scope and validation requirements can be reviewed.',
      },
      {
        id: 'partnerships',
        title: 'Partnerships',
        text: 'For publishers, content teams and language service providers, a clear handover matters. Talk with us about your production workflow, delivery formats and how our services could fit into your existing process.',
      },
    ],
  },
  {
    label: 'GLOBAL PRESENCE',
    title: 'New audiences. Carefully considered content.',
    items: [
      {
        id: 'global-capabilities',
        title: 'Global Capabilities',
        text: 'Our services cover translation, multilingual desktop publishing, eLearning localization, subtitling and digital publishing. Combine language and production requirements in your brief to plan content for each target audience.',
      },
      {
        id: 'locations',
        title: 'Locations',
        text: 'Connect with EPUBTRANS in Chennai, India. Contact info@epubtrans.com or call +91 44 3136 3907 to discuss your project and coordination needs.',
      },
      {
        id: 'language-coverage',
        title: 'Language Coverage',
        text: 'Tell us your source language, target languages and subject area. Our team can confirm availability and the appropriate service scope for your specific language pairs.',
      },
      {
        id: 'regional-expertise',
        title: 'Regional Expertise',
        text: 'Regional context includes terminology, scripts, layout and audience expectations. Share the markets you are targeting, together with any local style guides or reference material, when requesting localization.',
      },
    ],
  },
]
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
      <section id="about-us" className="et-container et-detail-grid et-company-section">
        <h2>About us</h2>
        <div>
          <p className="et-lead">
            EPUBTRANS is a technology-based publishing company. Our capabilities connect project
            management, XML and data conversion, typesetting, ePublishing, eBooks, translation and
            learning localization.
          </p>
          <h3 id="our-story" className="et-company-section" style={{ marginTop: 32, fontSize: 24 }}>
            Our story
          </h3>
          <p style={{ marginTop: 16, lineHeight: 1.8 }}>
            Our work brings together language and production requirements across websites, learning
            modules, multimedia and publishing. We start with the content, the audience and the
            format it needs to reach.
          </p>
          <ArrowLink href="/services">Explore our capabilities</ArrowLink>
        </div>
      </section>
      <section id="mission-vision" className="et-company-home et-company-section">
        <div className="et-container">
          <p className="et-label">MISSION & VISION</p>
          <h2>
            Bring ideas to new formats.
            <br />
            <em>Bring cultures into conversation.</em>
          </h2>
          <div>
            <p>
              Our purpose is to connect human expertise with technology, helping ideas move between
              formats, languages and cultures. We see a future where content can reach new audiences
              while retaining the meaning and care behind the original.
            </p>
            <ArrowLink href="/get-a-quote">Work with EPUBTRANS</ArrowLink>
          </div>
        </div>
      </section>
      {companyTopics.map((group) => (
        <section key={group.label} className="et-container et-content-section">
          <p className="et-label">{group.label}</p>
          <h2>{group.title}</h2>
          <div className="et-company-topics">
            {group.items.map((item) => (
              <article key={item.id} id={item.id}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <ArrowLink href="/get-a-quote">Discuss your requirements</ArrowLink>
        </section>
      ))}
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
