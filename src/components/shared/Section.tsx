import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({
  children,
  className = '',
}: SectionProps) {
  return (
    <section className={`py-20 md:py-24 lg:py-28 ${className}`}>
      {children}
    </section>
  )
}