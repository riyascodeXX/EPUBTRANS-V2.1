import { pageMetadata } from '@/lib/seo'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { PageHero } from '@/components/editorial/Primitives'
export const metadata = pageMetadata({
  title: 'Get a Quote',
  description: 'Tell EPUBTRANS about your publishing, translation or digital content project.',
  alternates: { canonical: '/get-a-quote' },
})

export default function Quote() {
  return (
    <main>
      <PageHero
        eyebrow="GET A QUOTE"
        title="Let’s shape what comes next."
        description="Tell us about your content. We’ll start with your requirements."
      />
      <section className="et-container et-content-section">
        <QuoteForm />
      </section>
    </main>
  )
}
