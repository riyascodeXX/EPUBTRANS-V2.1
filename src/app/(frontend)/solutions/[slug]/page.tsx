import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/content'
import { DetailPage } from '@/components/editorial/DetailPage'
type Props = { params: Promise<{ slug: string }> }
export const dynamic = 'force-dynamic'
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const doc = await getContent('solutions', slug)
  return pageMetadata({
    title: doc?.seo?.metaTitle || doc?.title || 'Solution',
    description: doc?.seo?.metaDescription || doc?.shortDescription,
    alternates: { canonical: `/solutions/${slug}` },
  })
}
export default async function SolutionPage({ params }: Props) {
  const { slug } = await params
  const document = await getContent('solutions', slug)
  if (!document) notFound()
  return <DetailPage document={document} section="Solutions" route="solutions" />
}
