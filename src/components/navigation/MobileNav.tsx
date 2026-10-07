'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/i18n/LocalizedLink'
import { navigation } from '@/config/navigation'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (label: string) => {
    setOpenItem((current) => (current === label ? null : label))
  }

  const closeMenu = () => {
    setIsOpen(false)
    setOpenItem(null)
  }

  // Close menu with Escape
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-lg
          border
          border-white/20
          text-white

          transition-all
          duration-200

          hover:border-[#F2A03A]
          hover:text-[#F2A03A]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#F2A03A]

          lg:hidden
        "
      >
        <span className="relative block h-5 w-5">
          {/* Top */}
          <span
            className={`
              absolute
              left-0
              block
              h-0.5
              w-5
              bg-current
              transition-all
              duration-300
              ${isOpen ? 'top-2.5 rotate-45' : 'top-1'}
            `}
          />

          {/* Middle */}
          <span
            className={`
              absolute
              left-0
              top-2.5
              block
              h-0.5
              w-5
              bg-current
              transition-all
              duration-200
              ${isOpen ? 'opacity-0' : 'opacity-100'}
            `}
          />

          {/* Bottom */}
          <span
            className={`
              absolute
              left-0
              block
              h-0.5
              w-5
              bg-current
              transition-all
              duration-300
              ${isOpen ? 'top-2.5 -rotate-45' : 'top-4'}
            `}
          />
        </span>
      </button>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}
      <div
        aria-hidden={!isOpen}
        className={`
          fixed
          inset-x-0
          bottom-0
          top-20
          z-40

          overflow-y-auto

          bg-black

          transition-all
          duration-300
          ease-out

          lg:hidden

          ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}
        `}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8">
          <nav aria-label="Mobile navigation">
            {/* =================================================
                MAIN NAVIGATION
            ================================================= */}
            <div className="divide-y divide-white/10">
              {navigation.map((item) => (
                <div key={item.label}>
                  {/* =========================================
                      ITEMS WITH CHILDREN
                  ========================================= */}
                  {item.groups ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={openItem === item.label}
                        onClick={() => toggleItem(item.label)}
                        className="
                          flex
                          w-full
                          items-center
                          justify-between

                          py-5

                          text-left
                          text-base
                          font-semibold
                          text-white

                          transition-colors
                          duration-200

                          hover:text-[#F2A03A]

                          focus-visible:outline-none
                          focus-visible:text-[#F2A03A]
                        "
                      >
                        <span>{item.label}</span>

                        <span
                          aria-hidden="true"
                          className={`
                            text-sm
                            transition-transform
                            duration-300
                            ${openItem === item.label ? 'rotate-180' : ''}
                          `}
                        >
                          ▾
                        </span>
                      </button>

                      {/* =====================================
                          ACCORDION CONTENT
                      ===================================== */}
                      <div
                        className={`
                          overflow-hidden
                          transition-all
                          duration-300
                          ease-out

                          ${
                            openItem === item.label
                              ? 'max-h-[1600px] pb-5 opacity-100'
                              : 'max-h-0 opacity-0'
                          }
                        `}
                      >
                        <div className="space-y-7 border-l border-[#078686] pl-4">
                          {item.groups.map((group) => (
                            <div key={group.title}>
                              {/* Category */}
                              <h3
                                className="
                                  mb-2
                                  text-sm
                                  font-semibold
                                  tracking-wide
                                  text-[#078686]
                                "
                              >
                                {group.title}
                              </h3>

                              {/* Services */}
                              <div className="space-y-1">
                                {group.items.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href ?? '#'}
                                    onClick={closeMenu}
                                    className="
                                      block
                                      rounded-lg

                                      px-3
                                      py-3

                                      text-sm
                                      font-medium
                                      text-white

                                      transition-all
                                      duration-200

                                      hover:bg-[#12383A]
                                      hover:text-white

                                      focus-visible:bg-[#12383A]
                                      focus-visible:outline-none
                                    "
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* =======================================
                       NORMAL NAVIGATION ITEM
                    ======================================= */
                    <Link
                      href={item.href ?? '#'}
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        justify-between

                        py-5

                        text-base
                        font-semibold
                        text-white

                        transition-colors
                        duration-200

                        hover:text-[#F2A03A]

                        focus-visible:outline-none
                        focus-visible:text-[#F2A03A]
                      "
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* =================================================
                LANGUAGE
            ================================================= */}
            <div className="border-t border-white/10 py-5">
              <button
                type="button"
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
            </div>

            {/* =================================================
                REQUEST A QUOTE
            ================================================= */}
            <Link
              href="/get-a-quote"
              onClick={closeMenu}
              className="
                flex
                min-h-12
                w-full
                items-center
                justify-center

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

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#F2A03A]
              "
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

