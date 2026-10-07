import { PageHero, ArrowLink } from '@/components/editorial/Primitives'
export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="404 / A DIFFERENT CHAPTER"
        title="This page is out of the edition."
        description="The page may have moved, or it may not be published yet."
      />
      <div className="et-container et-content-section">
        <ArrowLink href="/">Return to the homepage</ArrowLink>
      </div>
    </main>
  )
}

