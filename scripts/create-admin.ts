import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const p = await getPayload({ config })
if ((await p.count({ collection: 'users', overrideAccess: true })).totalDocs)
  throw new Error(
    'An administrator already exists. Use the admin login; no existing accounts are changed.',
  )
if (
  !process.env.ADMIN_EMAIL ||
  !process.env.ADMIN_PASSWORD ||
  process.env.ADMIN_PASSWORD.length < 16
)
  throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (16+ characters).')
await p.create({
  collection: 'users',
  overrideAccess: true,
  data: {
    name: 'EPUBTRANS Administrator',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
})
console.log('First administrator created.')
await p.destroy()
process.exit(0)
