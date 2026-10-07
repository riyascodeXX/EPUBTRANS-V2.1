import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const payload = await getPayload({ config })
for (const collection of [
  'pages',
  'posts',
  'services',
  'solutions',
  'industries',
  'media',
] as const) {
  const result = await payload.find({
    collection,
    limit: 40,
    depth: 0,
    select: { title: true, slug: true, status: true, _status: true },
  })
  console.log(JSON.stringify({ collection, total: result.totalDocs, documents: result.docs }))
}
await payload.destroy()
