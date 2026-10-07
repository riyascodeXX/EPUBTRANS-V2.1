import { authenticated } from '@/access/authenticated'
import { publishedContent } from '@/access/publishedContent'
import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',

  admin: {
    useAsTitle: 'title',

    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],

    group: 'Content',
  },

  access: {
    read: publishedContent,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },

  fields: [
    // =====================================================
    // BASIC INFORMATION
    // =====================================================

    {
      name: 'title',
      type: 'text',
      required: true,

      admin: {
        description: 'Solution name displayed on the website.',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,

      admin: {
        description: 'URL slug. Example: digital-publishing',
      },
    },

    {
      name: 'shortDescription',
      type: 'textarea',

      admin: {
        description: 'Short description used on solution cards and listings.',
      },
    },

    // =====================================================
    // HERO
    // =====================================================

    {
      name: 'hero',
      type: 'group',

      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },

        {
          name: 'headline',
          type: 'text',
        },

        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // =====================================================
    // OVERVIEW
    // =====================================================

    {
      name: 'overview',
      type: 'richText',

      admin: {
        description: 'Main solution overview content.',
      },
    },

    // =====================================================
    // CAPABILITIES
    // =====================================================

    {
      name: 'capabilities',
      type: 'array',

      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // =====================================================
    // USE CASES
    // =====================================================

    {
      name: 'useCases',
      type: 'array',

      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // =====================================================
    // WORKFLOW
    // =====================================================

    {
      name: 'workflow',
      type: 'array',

      fields: [
        {
          name: 'step',
          type: 'number',
          required: true,
        },

        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // =====================================================
    // FAQ
    // =====================================================

    {
      name: 'faqs',
      type: 'array',

      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },

        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },

    // =====================================================
    // STATUS
    // =====================================================

    {
      name: 'status',
      type: 'select',
      required: true,

      defaultValue: 'draft',

      options: [
        {
          label: 'Draft',
          value: 'draft',
        },

        {
          label: 'Published',
          value: 'published',
        },
      ],
    },

    // =====================================================
    // SEO
    // =====================================================

    {
      name: 'seo',
      type: 'group',

      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },

        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },
  ],
}
