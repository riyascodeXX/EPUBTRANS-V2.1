import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const p = await getPayload({ config })
for (const collection of ['services', 'solutions'] as const) {
  const r = await p.find({
    collection,
    where: { status: { equals: 'published' } },
    depth: 0,
    limit: 1,
  })
  console.log(JSON.stringify(r.docs[0]))
}
await p.destroy()
