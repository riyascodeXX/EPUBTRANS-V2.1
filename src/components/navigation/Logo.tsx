import Link from 'next/link'
export function Logo() {
  return (
    <Link href="/" className="et-logo" aria-label="EPUBTRANS Home">
      <span className="et-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      EPUBTRANS
    </Link>
  )
}
