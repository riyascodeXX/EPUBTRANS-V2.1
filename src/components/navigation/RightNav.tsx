import Link from '@/components/i18n/LocalizedLink'

export function RightNav() {
  return (
    <div className="flex shrink-0 items-center gap-6">
      {/* Language */}
      <button
        type="button"
        aria-label="Select language"
        className="
          text-sm
          font-semibold
          text-white

          transition-colors
          duration-200

          hover:text-[#F2A03A]

          focus-visible:outline-none
          focus-visible:text-[#F2A03A]
        "
      >
        EN
      </button>

      {/* Request a Quote */}
      <Link
        href="/get-a-quote"
        className="
          inline-flex
          min-h-11
          items-center
          justify-center

          whitespace-nowrap

          rounded-lg

          bg-[#12383A]

          px-5
          py-3

          text-sm
          font-semibold
          text-white

          transition-all
          duration-200

          hover:bg-[#078686]

          hover:shadow-[0_8px_20px_rgba(7,134,134,0.25)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#F2A03A]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-black
        "
      >
        Request a Quote
      </Link>
    </div>
  )
}

