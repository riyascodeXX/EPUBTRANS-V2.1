import { getLanguage } from '@/config/languages'
export function saveLanguagePreference(code: string) {
  if (!getLanguage(code)) return
  document.cookie = `epubtrans-language=${encodeURIComponent(code)}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`
}
