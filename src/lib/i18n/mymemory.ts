// MyMemory's public API accepts at most 500 UTF-8 bytes per segment.
export function translationSegments(text: string): string[] {
  const segments: string[] = []
  let remaining = text.trim()
  while (Buffer.byteLength(remaining, 'utf8') > 500) {
    let end = 0
    let bytes = 0
    for (const character of remaining) {
      const size = Buffer.byteLength(character, 'utf8')
      if (bytes + size > 500) break
      bytes += size
      end += character.length
    }
    const space = remaining.lastIndexOf(' ', end)
    if (space > 0) end = space
    segments.push(remaining.slice(0, end).trim())
    remaining = remaining.slice(end).trim()
  }
  if (remaining) segments.push(remaining)
  return segments
}

export async function translateWithMyMemory(text: string, locale: string): Promise<string> {
  const translated: string[] = []
  for (const segment of translationSegments(text)) {
    const url = new URL('https://api.mymemory.translated.net/get')
    url.searchParams.set('q', segment)
    url.searchParams.set('langpair', `en|${locale}`)
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) })
    if (!response.ok) throw new Error('Translation provider unavailable')
    const result = (await response.json()) as {
      responseStatus?: number | string
      quotaFinished?: boolean
      responseData?: { translatedText?: string }
    }
    const value = result.responseData?.translatedText
    if (
      Number(result.responseStatus) !== 200 ||
      result.quotaFinished ||
      typeof value !== 'string' ||
      !value.trim() ||
      value.length > 20000
    )
      throw new Error('Translation provider unavailable or daily quota reached')
    translated.push(value)
  }
  return translated.join(' ')
}
