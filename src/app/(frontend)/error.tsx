'use client'
import Link from 'next/link'
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="et-container et-content-section">
      <p className="et-label">A MOMENTARY INTERRUPTION</p>
      <h1 style={{ fontSize: 'var(--type-h1)', lineHeight: 1.1, letterSpacing: '-.05em' }}>
        Let’s try that again.
      </h1>
      <p className="et-lead" style={{ marginBlock: 32 }}>
        We couldn’t load this page. Try again, or return to the homepage.
      </p>
      <button className="et-button" onClick={reset}>
        Try again →
      </button>
      <Link className="et-text-link" style={{ marginInlineStart: 24 }} href="/">
        Return home →
      </Link>
    </main>
  )
}
