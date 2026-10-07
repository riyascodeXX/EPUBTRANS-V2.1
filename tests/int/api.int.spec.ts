import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { validateQuote, type QuoteData } from '@/lib/validation/quote'

let payload: Payload

describe('Published content and private enquiries', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
  })
  afterAll(async () => {
    await payload?.destroy()
  })
  it('anonymous service queries return only published records', async () => {
    const services = await payload.find({
      collection: 'services',
      overrideAccess: false,
      limit: 100,
    })
    expect(services.docs.every((service) => service.status === 'published')).toBe(true)
  })
  it('anonymous readers cannot list private enquiries', async () => {
    await expect(
      payload.find({ collection: 'quote-requests', overrideAccess: false }),
    ).rejects.toThrow()
  })
  it('missing consent and a malformed email prevent a quote submission', () => {
    const data: QuoteData = {
      service: 'Publishing & content',
      name: 'Example Reader',
      email: 'bad-address',
      details: 'A publishing project with several chapters.',
      sourceLanguage: '',
      targetLanguages: '',
      deadline: '',
      company: '',
      website: '',
      consent: false,
    }
    expect(validateQuote(data)).toMatchObject({
      email: expect.any(String),
      consent: expect.any(String),
    })
  })
})
