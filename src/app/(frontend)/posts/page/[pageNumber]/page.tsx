import { redirect, notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
export default async function LegacyPagination({
  params,
}: {
  params: Promise<{ pageNumber: string }>
}) {
  const { pageNumber } = await params
  if (!/^\d+$/.test(pageNumber) || Number(pageNumber) < 1) notFound()
  redirect(`/resources?page=${Number(pageNumber)}`)
}

