import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/content'
import { DetailPage } from '@/components/editorial/DetailPage'
type Props = { params: Promise<{ slug: string }> }
export const dynamic = 'force-dynamic'
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const doc = await getContent('services', slug)
  return pageMetadata({
    title:
      doc?.seo?.metaTitle?.replace(/\s*\|\s*EPUBTRANS\s*$/i, '').trim() || doc?.title || 'Service',
    description: doc?.seo?.metaDescription || doc?.shortDescription,
    alternates: { canonical: `/services/${slug}` },
  })
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const document = await getContent('services', slug)
  if (!document) notFound()
  return <DetailPage document={document} section="What We Do" route="services" />
}

