import Link from '@/components/i18n/LocalizedLink'
import Image from 'next/image'
import { useId, type CSSProperties } from 'react'
export function Logo() {
  const filterId = `et-logo-contrast-${useId()}`
  return (
    <Link href="/" className="et-logo" aria-label="EPUBTRANS Home" data-no-translate>
      <svg className="et-brand-filters" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            {/* Select white artwork while leaving the green and orange untouched. */}
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 5 5 0 -14"
              result="whiteArtwork"
            />
            <feComposite in="whiteArtwork" in2="SourceAlpha" operator="in" result="whiteMask" />
            <feFlood floodColor="currentColor" result="letterColor" />
            <feComposite in="letterColor" in2="whiteMask" operator="in" result="readableLetters" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="readableLetters" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <span
        className="et-brand-lockup"
        aria-hidden="true"
        style={{ '--et-brand-filter': `url(#${filterId})` } as CSSProperties}
      >
        <span className="et-brand-ink" />
        <Image
          src="/favicon.jpeg"
          alt=""
          width={941}
          height={150}
          sizes="(max-width: 600px) 185px, 220px"
          className="et-brand-source"
        />
      </span>
    </Link>
  )
}
