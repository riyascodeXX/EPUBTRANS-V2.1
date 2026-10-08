import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getCMSPage, getPreviewAccess } from '@/lib/content'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/components/heroes/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'
type Args = { params: Promise<{ slug: string }> }
export default async function CMSPage({ params }: Args) {
  const { slug } = await params
  if (slug === 'home') redirect('/')
  const page = await getCMSPage(slug)
  if (!page) return <PayloadRedirects url={`/${slug}`} />
  const { draft } = await getPreviewAccess()
  return (
    <main>
      <PayloadRedirects disableNotFound url={`/${slug}`} />
      {draft && <LivePreviewListener />}
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  return generateMeta({ doc: await getCMSPage(slug) })
}

