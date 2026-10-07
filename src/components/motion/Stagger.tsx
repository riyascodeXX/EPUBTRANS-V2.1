import type { ReactNode } from 'react'
export function Stagger({ children }: { children: ReactNode }) {
  return <div className="et-stagger">{children}</div>
}
