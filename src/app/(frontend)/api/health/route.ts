import { contentPayload } from '@/lib/content'
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const p = await contentPayload()
    await p.count({ collection: 'services', overrideAccess: false })
    return Response.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json(
      { status: 'unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
