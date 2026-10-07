import { afterEach, describe, expect, it, vi } from 'vitest'
import { translateWithMyMemory, translationSegments } from '@/lib/i18n/mymemory'

afterEach(() => vi.unstubAllGlobals())

describe('translation without a Cloud key', () => {
  it('splits long public text within the UTF-8 provider limit without losing words', () => {
    const text = 'Publishing — a wider world. '.repeat(40).trim()
    const segments = translationSegments(text)
    expect(segments.length).toBeGreaterThan(1)
    expect(segments.every((segment) => Buffer.byteLength(segment, 'utf8') <= 500)).toBe(true)
    expect(segments.join(' ')).toBe(text)
  })
  it('translates each segment with the selected language and joins the result', async () => {
    const fetchTranslation = vi.fn(async (_url: URL) => ({
      ok: true,
      json: async () => ({
        responseStatus: 200,
        responseData: { translatedText: 'Votre contenu.' },
      }),
    }))
    vi.stubGlobal('fetch', fetchTranslation)
    expect(await translateWithMyMemory('Your content.', 'fr')).toBe('Votre contenu.')
    const url = new URL(fetchTranslation.mock.calls[0][0] as unknown as string)
    expect(url.searchParams.get('langpair')).toBe('en|fr')
    expect(url.searchParams.get('q')).toBe('Your content.')
  })
  it('rejects quota warnings so they are never displayed or cached as translations', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          responseStatus: 403,
          quotaFinished: true,
          responseData: { translatedText: 'Daily limit reached' },
        }),
      })),
    )
    await expect(translateWithMyMemory('Your content.', 'hi')).rejects.toThrow('quota')
  })
})
