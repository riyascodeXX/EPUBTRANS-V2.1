import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

const services = [
  {
    number: '01',
    title: 'Accessibility Services',
    href: '/services/accessibility',
    category: 'Accessibility',
  },
  {
    number: '02',
    title: 'Cover Page Design Services',
    href: '/services/cover-page-design',
    category: 'Publishing',
  },
  {
    number: '03',
    title: 'Copyediting Services',
    href: '/services/copyediting',
    category: 'Publishing',
  },
  {
    number: '04',
    title: 'Data Conversion Services',
    href: '/services/data-conversion',
    category: 'Publishing',
  },
  {
    number: '05',
    title: 'Desktop Publishing Services',
    href: '/services/desktop-publishing',
    category: 'Translation & Localization',
  },
  {
    number: '06',
    title: 'e-Learning Localization Services',
    href: '/services/elearning-localization',
    category: 'Translation & Localization',
  },
  {
    number: '07',
    title: 'eBook Creation Services',
    href: '/services/ebook-creation',
    category: 'Publishing',
  },
  {
    number: '08',
    title: 'Graphic Design and Image Services',
    href: '/services/graphic-design-image-services',
    category: 'Publishing',
  },
  {
    number: '09',
    title: 'Indexing Services',
    href: '/services/indexing',
    category: 'Publishing',
  },
  {
    number: '10',
    title: 'Proofreading Services',
    href: '/services/proofreading',
    category: 'Publishing',
  },
  {
    number: '11',
    title: 'SciELO XML Markup Services',
    href: '/services/scielo-xml-markup',
    category: 'Publishing',
  },
  {
    number: '12',
    title: 'Subtitling Services',
    href: '/services/subtitling',
    category: 'Translation & Localization',
  },
  {
    number: '13',
    title: 'Transcription Services',
    href: '/services/transcription',
    category: 'Translation & Localization',
  },
  {
    number: '14',
    title: 'Translation Services',
    href: '/services/translation',
    category: 'Translation & Localization',
  },
  {
    number: '15',
    title: 'Typesetting Services',
    href: '/services/typesetting',
    category: 'Publishing',
  },
  {
    number: '16',
    title: 'Voiceover Services',
    href: '/services/voiceover',
    category: 'Translation & Localization',
  },
]

export function ServicesOverview() {
  return (
    <Section className="bg-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#078686]">
            What We Do
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#12383A] md:text-4xl lg:text-5xl">
            Professional services built around your content
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#526568]">
            Explore our publishing, translation, localization, and
            accessibility services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="
                group
                relative
                flex
                min-h-[190px]
                flex-col
                justify-between
                overflow-hidden
                rounded-2xl
                border
                border-[#DCE5E5]
                bg-white
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#12383A]
                hover:bg-[#12383A]
                hover:shadow-[0_20px_40px_rgba(18,56,58,0.15)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#078686]
              "
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#078686]
                    transition-colors
                    duration-300
                    group-hover:text-[#F2A03A]
                  "
                >
                  {service.number}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-lg
                    text-[#12383A]
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-white
                  "
                >
                  →
                </span>
              </div>

              {/* Content */}
              <div>
                <p
                  className="
                    mb-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#078686]
                    transition-colors
                    duration-300
                    group-hover:text-[#F2A03A]
                  "
                >
                  {service.category}
                </p>

                <h3
                  className="
                    max-w-xs
                    text-lg
                    font-semibold
                    leading-7
                    text-[#12383A]
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10">
          <Link
            href="/services"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#12383A]
              transition-colors
              duration-200
              hover:text-[#078686]
            "
          >
            Explore all services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
}