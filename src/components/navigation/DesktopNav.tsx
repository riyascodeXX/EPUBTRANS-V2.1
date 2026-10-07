import Link from '@/components/i18n/LocalizedLink'
import { navigation } from '@/config/navigation'

export function DesktopNav() {
  return (
    <nav aria-label="Main navigation" className="hidden items-center lg:flex">
      {/* =====================================================
          CENTER — MAIN NAVIGATION
      ===================================================== */}
      <div className="flex items-center gap-8">
        {navigation.map((item) => (
          <div key={item.label} className="group relative">
            {/* Main Nav Item */}
            <Link
              href={item.href ?? '#'}
              className="
                flex
                items-center
                gap-1
                whitespace-nowrap
                py-6

                text-sm
                font-medium
                text-white

                transition-colors
                duration-200

                hover:text-[#F2A03A]

                focus-visible:outline-none
                focus-visible:text-[#F2A03A]
              "
            >
              {item.label}

              {item.groups && (
                <span
                  aria-hidden="true"
                  className="
                    text-xs
                    text-white
                    transition-transform
                    duration-300
                    group-hover:rotate-180
                  "
                >
                  ▾
                </span>
              )}
            </Link>

            {/* =================================================
                MEGA MENU
            ================================================= */}
            {item.groups && (
              <div
                className="
                  invisible
                  absolute
                  left-1/2
                  top-full
                  z-50

                  w-[760px]
                  -translate-x-1/2
                  translate-y-3

                  rounded-2xl

                  border
                  border-white/10

                  bg-black

                  p-7

                  opacity-0

                  shadow-[0_25px_60px_rgba(0,0,0,0.35)]

                  transition-all
                  duration-300
                  ease-out

                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                  {item.groups.map((group) => (
                    <div key={group.title}>
                      {/* Category Heading */}
                      <h3
                        className="
                          mb-3
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
                            className="
                              group/item
                              block
                              rounded-lg
                              px-3
                              py-3

                              text-sm
                              text-white

                              transition-all
                              duration-200

                              hover:bg-[#12383A]
                              hover:text-white

                              focus-visible:bg-[#12383A]
                              focus-visible:outline-none
                            "
                          >
                            <span className="font-medium">{child.label}</span>

                            {child.description && (
                              <span
                                className="
                                  mt-1
                                  block
                                  text-xs
                                  leading-5
                                  text-white/60
                                "
                              >
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

