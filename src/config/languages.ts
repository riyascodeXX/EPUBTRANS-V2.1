export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', enabled: true, direction: 'ltr' },
] as const
export const plannedLanguages = [
  { code: 'hi', name: 'Hindi', direction: 'ltr' },
  { code: 'ta', name: 'Tamil', direction: 'ltr' },
  { code: 'te', name: 'Telugu', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', direction: 'ltr' },
  { code: 'mr', name: 'Marathi', direction: 'ltr' },
  { code: 'kn', name: 'Kannada', direction: 'ltr' },
  { code: 'ml', name: 'Malayalam', direction: 'ltr' },
  { code: 'gu', name: 'Gujarati', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', direction: 'rtl' },
] as const
export type LanguageCode = (typeof languages)[number]['code']
