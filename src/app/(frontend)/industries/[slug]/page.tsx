import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/content'
import { DetailPage } from '@/components/editorial/DetailPage'
type Props = { params: Promise<{ slug: string }> }
export const dynamic = 'force-dynamic'
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const doc = await getContent('industries', slug)
  return pageMetadata({
    title: doc?.seo?.metaTitle || doc?.title || 'Industry',
    description: doc?.seo?.metaDescription || doc?.shortDescription,
    alternates: { canonical: `/industries/${slug}` },
  })
}
export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const document = await getContent('industries', slug)
  if (!document) notFound()
  return <DetailPage document={document} section="Industries" route="industries" />
}
