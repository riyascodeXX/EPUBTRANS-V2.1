import type { ReactNode } from 'react'
export function RevealText({ children }: { children: ReactNode }) {
  return (
    <span className="et-reveal-text">
      <span>{children}</span>
    </span>
  )
}
