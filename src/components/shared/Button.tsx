import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const variants = {
    primary:
      'bg-[#078686] text-white hover:bg-[#12383A]',

    secondary:
      'bg-[#F2A03A] text-[#12383A] hover:brightness-95',

    outline:
      'border border-[#DCE5E5] bg-white text-[#12383A] hover:border-[#078686] hover:text-[#078686]',
  }

  return (
    <button
      className={`
        inline-flex
        min-h-11
        items-center
        justify-center
        rounded-lg
        px-5
        py-3
        text-sm
        font-semibold
        transition-colors
        duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#078686]
        focus-visible:ring-offset-2
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}