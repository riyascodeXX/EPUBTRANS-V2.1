export const siteConfig = {
  name: 'EPUBTRANS',

  description:
    'Professional publishing, translation, localization, multimedia, and accessibility services.',

  url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  colors: {
    teal: '#078686',
    orange: '#F2A03A',
    green: '#20BE27',
    deepTeal: '#12383A',
    gray: '#526568',
    softTeal: '#EAF6F5',
    offWhite: '#F7F9F9',
    white: '#FFFFFF',
    border: '#DCE5E5',
    red: '#F3151A',
  },
} as const
