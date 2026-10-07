'use client'
import NextLink from 'next/link'
import { languagePath } from '@/config/languages'
import { useSiteLocale } from './LocaleProvider'
export default function LocalizedLink(props: React.ComponentProps<typeof NextLink>) {
  const locale = useSiteLocale(),
    href = props.href
  const localized =
    typeof href === 'string'
      ? languagePath(href, locale)
      : href.pathname
        ? { ...href, pathname: languagePath(href.pathname, locale) }
        : href
  return <NextLink {...props} href={localized} />
}
