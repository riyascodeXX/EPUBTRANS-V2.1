import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { Providers } from '@/providers'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'
import '../../styles-tokens.css'
import '../../styles-enterprise.css'
export const dynamic = 'force-dynamic'
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
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
          <a className="et-skip" href="#main-content">
            Skip to main content
          </a>
          <Header />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
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
