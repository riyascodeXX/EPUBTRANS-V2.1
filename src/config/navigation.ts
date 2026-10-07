import type { NavigationSection } from '@/types/navigation'
export const navigation: NavigationSection[] = [
  {
    label: 'What We Do',
    href: '/services',
    groups: [
      {
        title: 'Language & localization',
        items: [
          { label: 'Translation', href: '/services/translation' },
          { label: 'Desktop publishing', href: '/services/desktop-publishing' },
        ],
      },
      {
        title: 'Publishing & content',
        items: [
          { label: 'Copyediting', href: '/services/copyediting' },
          { label: 'Proofreading', href: '/services/proofreading' },
          { label: 'Typesetting', href: '/services/typesetting' },
          { label: 'eBook creation', href: '/services/ebook-creation' },
          { label: 'Cover design', href: '/services/cover-page-design' },
          { label: 'Graphic design & images', href: '/services/graphic-design-image-services' },
          { label: 'Indexing', href: '/services/indexing' },
          { label: 'Data conversion', href: '/services/data-conversion' },
          { label: 'SciELO XML markup', href: '/services/scielo-xml-markup' },
        ],
      },
      {
        title: 'Media',
        items: [
          { label: 'Subtitling', href: '/services/subtitling' },
          { label: 'Voiceover', href: '/services/voiceover' },
          { label: 'Transcription', href: '/services/transcription' },
        ],
      },
      {
        title: 'Learning',
        items: [{ label: 'eLearning localization', href: '/services/elearning-localization' }],
      },
      {
        title: 'Accessibility',
        items: [{ label: 'Accessible content', href: '/services/accessibility' }],
      },
    ],
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technology', href: '/technology' },
  { label: 'Resources', href: '/resources' },
  {
    label: 'Company',
    href: '/company',
    groups: [
      {
        title: 'EPUBTRANS',
        items: [
          { label: 'About EPUBTRANS', href: '/company' },
          { label: 'Careers', href: '/company/careers' },
        ],
      },
    ],
  },
]
