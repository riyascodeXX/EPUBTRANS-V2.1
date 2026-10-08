import { mkdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

// Reuse the original brand artwork inside a square SVG, without redrawing the logo.
const artwork = await readFile(new URL('../public/favicon.jpeg', import.meta.url))
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="166" height="166" viewBox="0 0 166 166">
  <rect width="166" height="166" rx="28" fill="#102b2b"/>
  <defs><clipPath id="brand"><rect x="10" y="8" width="146" height="150"/></clipPath></defs>
  <image x="10" y="8" width="941" height="150" clip-path="url(#brand)" href="data:image/png;base64,${artwork.toString('base64')}"/>
</svg>
`
const directory = new URL('../public/icons/', import.meta.url)
await mkdir(directory, { recursive: true })
await writeFile(new URL('epubtrans.svg', directory), svg)
for (const size of [32, 180, 256]) {
  const png = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
  await writeFile(new URL(`epubtrans-${size}.png`, directory), png)
  if (size === 256) {
    // A PNG-backed ICO also covers browsers requesting /favicon.ico directly.
    const header = Buffer.alloc(22)
    header.writeUInt16LE(1, 2)
    header.writeUInt16LE(1, 4)
    header.writeUInt16LE(1, 10)
    header.writeUInt16LE(32, 12)
    header.writeUInt32LE(png.length, 14)
    header.writeUInt32LE(22, 18)
    await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, png]))
  }
}
