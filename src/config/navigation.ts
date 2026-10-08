import type { NavigationSection } from '@/types/navigation'
export const navigation: NavigationSection[] = [
  {
    label: 'What We Do',
    href: '/services',
    overviewLabel: 'Explore our services',
    description:
      'From the first manuscript to the next audience. Find the expertise your content needs.',
    groups: [
      {
        title: 'Language & localization',
        description: 'Your message, ready for new markets.',
        items: [
          { label: 'Translation', href: '/services/translation' },
          { label: 'Desktop publishing', href: '/services/desktop-publishing' },
        ],
      },
      {
        title: 'Publishing & content',
        description: 'From editorial detail to the final edition.',
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
        description: 'Content that is seen and heard.',
        items: [
          { label: 'Subtitling', href: '/services/subtitling' },
          { label: 'Voiceover', href: '/services/voiceover' },
          { label: 'Transcription', href: '/services/transcription' },
        ],
      },
      {
        title: 'Learning',
        description: 'Learning experiences across languages.',
        items: [{ label: 'eLearning localization', href: '/services/elearning-localization' }],
      },
      {
        title: 'Accessibility',
        description: 'Help every audience access your content.',
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
    overviewLabel: 'Discover EPUBTRANS',
    description:
      'Meet the people, purpose and capabilities behind your next publishing and localization project.',
    groups: [
      {
        title: 'About EPUBTRANS',
        description: 'Our purpose. Your publishing partner.',
        items: [
          { label: 'About Us', href: '/company#about-us' },
          { label: 'Our Story', href: '/company#our-story' },
          { label: 'Mission & Vision', href: '/company#mission-vision' },
          { label: 'Why EPUBTRANS', href: '/company#why-epubtrans' },
          { label: 'Leadership', href: '/company#leadership' },
        ],
      },
      {
        title: 'Trust',
        description: 'Clarity at every stage of delivery.',
        items: [
          { label: 'Certifications', href: '/company#certifications' },
          { label: 'Quality', href: '/company#quality' },
          { label: 'Security', href: '/company#security' },
          { label: 'Compliance', href: '/company#compliance' },
          { label: 'Partnerships', href: '/company#partnerships' },
        ],
      },
      {
        title: 'Global Presence',
        description: 'Content for different markets and audiences.',
        items: [
          { label: 'Global Capabilities', href: '/company#global-capabilities' },
          { label: 'Locations', href: '/company#locations' },
          { label: 'Language Coverage', href: '/company#language-coverage' },
          { label: 'Regional Expertise', href: '/company#regional-expertise' },
        ],
      },
      {
        title: 'Careers',
        description: 'Bring your craft to our next chapter.',
        items: [
          { label: 'Careers', href: '/company/careers' },
          { label: 'Open Positions', href: '/company/careers#open-roles' },
          { label: 'Life at EPUBTRANS', href: '/company/careers#life-at-epubtrans' },
          { label: 'Internships', href: '/company/careers#internships' },
        ],
      },
    ],
  },
]
