import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import type { Industry } from '../src/payload-types'

// Neutral project-scoping copy. No clients, results, credentials or compliance promises.
const definitions = [
  [
    'Publishing',
    'publishing',
    'core',
    'Books, journals and other publications',
    'Manuscripts, figures, references and publication specifications',
    'Keeping editorial changes consistent across editions',
    'copyediting,proofreading,typesetting,ebook-creation',
  ],
  [
    'Education & eLearning',
    'education-elearning',
    'core',
    'Learning materials, course content and learner resources',
    'Course scripts, learning objectives and language requirements',
    'Keeping terminology and instructions consistent across learning materials',
    'elearning-localization,translation,accessibility',
  ],
  [
    'Technology',
    'technology',
    'core',
    'Product documentation, guides and technical content',
    'Documentation, terminology lists and product context',
    'Maintaining clear terminology as product information changes',
    'translation,proofreading,data-conversion',
  ],
  [
    'Healthcare',
    'healthcare',
    'core',
    'Informational materials and healthcare-related publications',
    'Source materials, intended audiences and subject-matter review requirements',
    'Making complex terminology clear for the intended audience',
    'copyediting,translation,typesetting',
  ],
  [
    'Media & Entertainment',
    'media-entertainment',
    'core',
    'Scripts, audiovisual text and supporting media content',
    'Scripts, transcripts, media files and timing requirements',
    'Coordinating text, timing and language across media formats',
    'subtitling,transcription,translation',
  ],
  [
    'Financial Services',
    'financial-services',
    'business-professional',
    'Reports, information documents and financial communications',
    'Reports, approved terminology and review responsibilities',
    'Preserving the meaning of terminology and numerical information',
    'proofreading,translation,desktop-publishing',
  ],
  [
    'Legal',
    'legal',
    'business-professional',
    'Legal documents and related reference materials',
    'Source documents, terminology and reviewer instructions',
    'Preserving defined terms, references and document structure',
    'translation,proofreading,typesetting',
  ],
  [
    'Retail & E-commerce',
    'retail-ecommerce',
    'business-professional',
    'Product information, catalogues and customer-facing content',
    'Product descriptions, catalogue data and language requirements',
    'Keeping product descriptions consistent across markets and formats',
    'translation,copyediting,data-conversion',
  ],
  [
    'Corporate',
    'corporate',
    'business-professional',
    'Business communications, reports and internal materials',
    'Brand guidelines, reports and approved source content',
    'Keeping tone and terminology consistent across business documents',
    'copyediting,translation,desktop-publishing',
  ],
  [
    'Government',
    'government',
    'business-professional',
    'Public information, reports and reference documents',
    'Approved source documents, audience requirements and publication specifications',
    'Organising information clearly for different public audiences',
    'translation,accessibility,typesetting',
  ],
  [
    'Travel & Hospitality',
    'travel-hospitality',
    'business-professional',
    'Destination information, guest materials and travel content',
    'Destination descriptions, guest information and language requirements',
    'Keeping practical information clear and consistent across languages',
    'translation,proofreading,desktop-publishing',
  ],
] as const

const payload = await getPayload({ config })
try {
  const { docs: services } = await payload.find({
    collection: 'services',
    where: { status: { equals: 'published' } },
    pagination: false,
    depth: 0,
  })
  const rows = process.argv.includes('--publishing-only') ? definitions.slice(0, 1) : definitions
  let created = 0
  for (const [title, slug, category, subject, inputs, challenge, serviceSlugs] of rows) {
    const existing = await payload.find({
      collection: 'industries',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length) {
      console.log(`Preserved existing industry: ${slug}`)
      continue
    }
    const shortDescription = `${subject}. Explore language, editorial and format requirements for your project.`
    const overview = `${subject} can involve different audiences, source formats and review needs. Start by identifying the material, its intended use and the required outputs. ${inputs} help define a practical project brief. Agree the scope, responsibilities and acceptance criteria before work begins.`
    const data: Omit<Industry, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      slug,
      category,
      shortDescription,
      hero: {
        eyebrow: title,
        headline: `Content requirements for ${title}`,
        description: shortDescription,
      },
      overview: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  text: overview,
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      challenges: [
        {
          title: 'Content consistency',
          description: `${challenge}. Define terminology, style and review ownership in the brief.`,
        },
        {
          title: 'Audience and format requirements',
          description:
            'Different readers and delivery channels may need different language, layout and file specifications.',
        },
        {
          title: 'Review and version control',
          description:
            'Identify the approved source version and how feedback will be consolidated before delivery.',
        },
      ],
      solutions: [
        {
          title: 'Define the content scope',
          description: `Discuss ${subject.toLowerCase()} with EPUBTRANS to identify the relevant content tasks and required outputs.`,
        },
        {
          title: 'Plan language and format work',
          description:
            'Specify target languages, terminology, layout and output formats. Confirm the applicable services during project scoping.',
        },
        {
          title: 'Agree review criteria',
          description:
            'Set out reviewer responsibilities, feedback rounds and acceptance criteria in the project brief.',
        },
      ],
      services: services
        .filter((service) => serviceSlugs.split(',').includes(service.slug))
        .map((service) => ({
          title: service.title,
          description: `Consider ${service.title.toLowerCase()} where it fits the agreed content scope. Confirm requirements and deliverables for your project.`,
        })),
      workflow: [
        {
          step: 1,
          title: 'Share the brief',
          description: `Provide ${inputs.toLowerCase()}, the intended audience and required delivery dates.`,
        },
        {
          step: 2,
          title: 'Confirm the scope',
          description:
            'Agree services, deliverables, source files and review responsibilities before proceeding.',
        },
        {
          step: 3,
          title: 'Review the content',
          description:
            'Use the agreed specifications to review prepared materials and consolidate feedback.',
        },
        {
          step: 4,
          title: 'Confirm delivery',
          description:
            'Check the agreed outputs, file formats and any remaining revisions against the project brief.',
        },
      ],
      faqs: [
        {
          question: 'What should I include in a project enquiry?',
          answer: `Include ${inputs.toLowerCase()}, approximate content volume, target languages, output formats and your preferred timeline.`,
        },
        {
          question: 'How are services and deliverables selected?',
          answer:
            'Selection depends on the source content and required outputs. Discuss the brief with EPUBTRANS and confirm the scope before proceeding.',
        },
        {
          question: 'Who reviews specialist content?',
          answer:
            'Identify qualified subject-matter reviewers in the project brief. Editorial and language work does not replace specialist, legal or regulatory review.',
        },
      ],
      seo: { metaTitle: title, metaDescription: shortDescription },
      status: 'draft',
    }
    if (!data.services?.length)
      throw new Error(`No matching published services for ${slug}; review before publishing.`)
    const draft = await payload.create({ collection: 'industries', data })
    await payload.update({ collection: 'industries', id: draft.id, data: { status: 'published' } })
    created++
    console.log(`Created complete industry: ${slug}`)
  }
  const result = await payload.find({ collection: 'industries', pagination: false, depth: 0 })
  console.log(
    JSON.stringify({
      created,
      total: result.totalDocs,
      published: result.docs.filter((doc) => doc.status === 'published').length,
    }),
  )
} finally {
  await payload.destroy()
}

// Payload's development config watcher can otherwise keep this one-shot CLI alive.
process.exit(0)
