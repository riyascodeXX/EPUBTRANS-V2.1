import 'dotenv/config'
import { unlink } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const p = await getPayload({ config })
const tests = await p.find({
  collection: 'quote-requests',
  overrideAccess: true,
  pagination: false,
  depth: 0,
  where: {
    and: [
      { name: { equals: 'EPUBTRANS Automated QA' } },
      { email: { equals: 'qa@epubtrans.example.invalid' } },
    ],
  },
})
for (const doc of tests.docs) {
  for (const file of doc.attachments || []) {
    if (!/^[0-9a-f-]+\.(txt|pdf|docx)$/.test(file.path))
      throw new Error('Unexpected test attachment path')
    await unlink(
      path.resolve(process.env.PRIVATE_UPLOAD_DIR || 'private-uploads', file.path),
    ).catch(() => {})
  }
  await p.delete({ collection: 'quote-requests', id: doc.id, overrideAccess: true })
}
console.log(`Removed ${tests.totalDocs} automated QA requests and their test files.`)
await p.destroy()
process.exit(0)
