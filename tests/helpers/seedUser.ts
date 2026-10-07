import { randomUUID } from 'node:crypto'
import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config.js'

export const testUser = {
  email: `epubtrans-admin-qa-${randomUUID()}@example.invalid`,
  password: randomUUID() + randomUUID(),
}
let payload: Payload | undefined
let createdID: number | undefined

export async function seedTestUser(): Promise<void> {
  payload = await getPayload({ config })
  const user = await payload.create({ collection: 'users', data: testUser })
  createdID = user.id
}

export async function cleanupTestUser(): Promise<void> {
  if (payload && createdID !== undefined)
    await payload.delete({ collection: 'users', id: createdID })
  await payload?.destroy()
}
