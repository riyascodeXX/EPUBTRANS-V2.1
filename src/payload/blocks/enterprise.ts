import type { Block, Field } from 'payload'
const heading: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
]
const link: Field = {
  name: 'link',
  type: 'group',
  fields: [
    { name: 'label', type: 'text' },
    {
      name: 'url',
      type: 'text',
      validate: (value: unknown) =>
        !value ||
        (typeof value === 'string' && (/^\/(?!\/)/.test(value) || /^https:\/\//.test(value)))
          ? true
          : 'Use a relative path or HTTPS URL.',
    },
  ],
}
const media: Field = { name: 'media', type: 'upload', relationTo: 'media' }
const items: Field = { name: 'items', type: 'array', fields: [...heading, link] }
function block(slug: string, fields: Field[]): Block {
  return {
    slug,
    labels: { singular: slug.replace(/([A-Z])/g, ' $1'), plural: slug.replace(/([A-Z])/g, ' $1') },
    fields,
  }
}
export const EnterpriseBlocks: Block[] = [
  block('enterpriseHero', [...heading, media, link]),
  block('editorialHero', [...heading, media, link]),
  block('richContent', [{ name: 'content', type: 'richText', required: true }]),
  block('mediaText', [...heading, media, { name: 'content', type: 'richText' }, link]),
  block('fullWidthMedia', [media, { name: 'caption', type: 'text' }]),
  block('statement', [...heading, link]),
  block('serviceExplorer', [
    ...heading,
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
  ]),
  block('solutionGrid', [
    ...heading,
    { name: 'solutions', type: 'relationship', relationTo: 'solutions', hasMany: true },
  ]),
  block('industryExplorer', [
    ...heading,
    { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true },
  ]),
  block('stats', [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'source', type: 'text', required: true },
        { name: 'verified', type: 'checkbox', defaultValue: false },
      ],
    },
  ]),
  block('quote', [
    { name: 'text', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
    { name: 'source', type: 'text', required: true },
    { name: 'permissionConfirmed', type: 'checkbox', defaultValue: false },
  ]),
  block('caseStudies', [
    ...heading,
    { name: 'cases', type: 'relationship', relationTo: 'case-studies', hasMany: true },
  ]),
  block('insights', [
    ...heading,
    { name: 'posts', type: 'relationship', relationTo: 'posts', hasMany: true },
  ]),
  block('logoWall', [
    ...heading,
    {
      name: 'logos',
      type: 'array',
      fields: [
        media,
        { name: 'name', type: 'text', required: true },
        { name: 'permissionConfirmed', type: 'checkbox', defaultValue: false },
      ],
    },
  ]),
  block('timeline', [...heading, items]),
  block('faq', [
    ...heading,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ]),
  block('enterpriseCTA', [...heading, link]),
]
