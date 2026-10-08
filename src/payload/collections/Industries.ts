import { authenticated } from '@/payload/access/authenticated'
import { publishedContent } from '@/payload/access/publishedContent'
import type { CollectionConfig, Field } from 'payload'

const contentItems = (name: string): Field => ({
  name,
  type: 'array',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
  ],
})

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: publishedContent,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Core Industries', value: 'core' },
        { label: 'Business & Professional', value: 'business-professional' },
      ],
    },
    { name: 'shortDescription', type: 'textarea' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'overview', type: 'richText' },
    contentItems('challenges'),
    contentItems('solutions'),
    contentItems('services'),
    {
      name: 'workflow',
      type: 'array',
      fields: [
        { name: 'step', type: 'number', required: true, min: 1 },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
