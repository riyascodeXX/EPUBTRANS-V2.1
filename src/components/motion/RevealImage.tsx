import { Media } from '@/components/Media'
import type { Media as MediaRecord } from '@/payload-types'
export function RevealImage({ media }: { media: MediaRecord }) {
  return (
    <div className="et-reveal-image">
      <Media resource={media} size="(max-width:650px) 100vw, 60vw" />
    </div>
  )
}
