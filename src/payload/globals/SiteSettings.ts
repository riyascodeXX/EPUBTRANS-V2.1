import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true, update: authenticated },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'EPUBTRANS' },
    { name: 'description', type: 'textarea' },
    { name: 'email', type: 'email', defaultValue: 'info@epubtrans.com' },
    { name: 'phone', type: 'text', defaultValue: '+91 44 3136 3907' },
    { name: 'location', type: 'text', defaultValue: 'Chennai, India' },
    {
      name: 'legalReviewed',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Legal text and quote data retention require owner review before production.',
      },
    },
    { name: 'defaultLocale', type: 'select', options: ['en'], defaultValue: 'en' },
  ],
}
