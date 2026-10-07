import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { Providers } from '@/providers'
import { getServerSideURL } from '@/utilities/getURL'
import { headers } from 'next/headers'
import { getLanguage } from '@/config/languages'
import { LocaleProvider } from '@/components/i18n/LocaleProvider'
import { EpubtransAssistant } from '@/components/assistant/EpubtransAssistant'
import { getSiteSettings } from '@/lib/content'
import './globals.css'
import '../../styles-tokens.css'
import '../../styles-enterprise.css'
import '@/components/assistant/assistant.css'
export const dynamic = 'force-dynamic'
export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const locale = getLanguage((await headers()).get('x-epubtrans-language') || 'en')?.code || 'en'
  const settings = await getSiteSettings()
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EPUBTRANS',
    url: getServerSideURL(),
    email: 'info@epubtrans.com',
    telephone: '+91 44 3136 3907',
  }
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      lang="en"
      dir="ltr"
      data-theme="light"
    >
      <body className="et-site">
        <Providers>
          <LocaleProvider locale={locale}>
            <a className="et-skip" href="#main-content">
              Skip to main content
            </a>
            <Header />
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
            <Footer />
            <EpubtransAssistant
              email={settings.email || 'info@epubtrans.com'}
              phone={settings.phone || '+91 44 3136 3907'}
            />
          </LocaleProvider>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  )
}
export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: { default: 'EPUBTRANS', template: '%s | EPUBTRANS' },
  description:
    'Professional publishing, translation, localization, multimedia, and accessibility services.',
  icons: { icon: '/favicon.jpeg' },
  openGraph: {
    type: 'website',
    siteName: 'EPUBTRANS',
    title: { default: 'EPUBTRANS', template: '%s | EPUBTRANS' },
    description: 'Publishing, language and digital content services.',
  },
  twitter: {
    card: 'summary',
    title: 'EPUBTRANS',
    description: 'Publishing, language and digital content services.',
  },
}
