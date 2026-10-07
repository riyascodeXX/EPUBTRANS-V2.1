'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Globe2, Menu, X } from 'lucide-react'
import type { NavigationSection } from '@/types/navigation'
import { Logo } from './Logo'

export function HeaderClient({ navigation }: { navigation: NavigationSection[] }) {
  const pathname = usePathname()
  return <HeaderState key={pathname} pathname={pathname} navigation={navigation} />
}
function HeaderState({
  pathname,
  navigation,
}: {
  pathname: string
  navigation: NavigationSection[]
}) {
  const [open, setOpen] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const header = useRef<HTMLElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const [mobileSection, setMobileSection] = useState<number | null>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (open === null) return
    const pointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(null)
    }
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(null)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', pointer)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('pointerdown', pointer)
      document.removeEventListener('keydown', key)
    }
  }, [open])
  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    [],
  )
  const closeMobile = () => {
    dialog.current?.close()
    document.body.style.overflow = ''
    menuButton.current?.focus()
  }
  return (
    <header
      ref={header}
      className="et-header"
      data-scrolled={scrolled}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null)
      }}
    >
      <div className="et-container et-header-inner">
        <Logo />
        <nav className="et-desktop-nav" aria-label="Main navigation">
          {navigation.map((item, index) =>
            item.groups ? (
              <button
                key={item.label}
                className="et-nav-link"
                aria-expanded={open === index}
                aria-controls={`mega-${index}`}
                ref={(node) => {
                  if (open === index) trigger.current = node
                }}
                onClick={(event) => {
                  trigger.current = event.currentTarget
                  setOpen(open === index ? null : index)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    setOpen(index)
                    requestAnimationFrame(() =>
                      document.querySelector<HTMLElement>(`#mega-${index} a`)?.focus(),
                    )
                  }
                }}
              >
                {item.label}
                <ChevronDown size={12} className="et-chevron" />
              </button>
            ) : (
              <Link
                key={item.label}
                className="et-nav-link"
                href={item.href!}
                aria-current={pathname.startsWith(item.href!) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="et-header-actions">
          <button
            className="et-nav-link"
            aria-expanded={open === 99}
            aria-controls="language-options"
            onClick={(event) => {
              trigger.current = event.currentTarget
              setOpen(open === 99 ? null : 99)
            }}
          >
            <Globe2 size={15} /> EN <ChevronDown size={12} />
          </button>
          <Link className="et-button" href="/get-a-quote">
            Get a Quote <ArrowRight size={16} className="et-arrow" />
          </Link>
        </div>
        <button
          ref={menuButton}
          className="et-mobile-toggle"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          onClick={() => {
            dialog.current?.showModal()
            document.body.style.overflow = 'hidden'
          }}
        >
          <Menu size={25} />
        </button>
      </div>
      {open !== null && (
        <button
          aria-label="Close navigation"
          className="et-menu-backdrop"
          tabIndex={-1}
          onClick={() => setOpen(null)}
        />
      )}
      {navigation.map(
        (item, index) =>
          open === index &&
          item.groups && (
            <div key={item.label} className="et-mega" id={`mega-${index}`}>
              <div className="et-container">
                <div className="et-mega-top">
                  <Link className="et-mega-title" href={item.href!} onClick={() => setOpen(null)}>
                    Explore {item.label.toLowerCase()}{' '}
                    <ArrowRight className="et-arrow" size={25} style={{ display: 'inline' }} />
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(null)
                      trigger.current?.focus()
                    }}
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="et-mega-groups">
                  {item.groups.map((group) => (
                    <div key={group.title}>
                      <h3>{group.title}</h3>
                      <ul>
                        {group.items.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href!} onClick={() => setOpen(null)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
      )}
      {open === 99 && (
        <div id="language-options" className="et-language">
          <strong>
            English <span aria-hidden="true">✓</span>
          </strong>
          <p>More languages will be available as translated content is published.</p>
        </div>
      )}
      <dialog
        ref={dialog}
        className="et-mobile-dialog"
        aria-label="Site navigation"
        onCancel={closeMobile}
      >
        <div className="et-mobile-top">
          <Logo />
          <button className="et-mobile-toggle" onClick={closeMobile} aria-label="Close navigation">
            <X size={25} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <div className="et-mobile-row" key={item.label}>
              {item.groups ? (
                <>
                  <button
                    aria-expanded={mobileSection === index}
                    aria-controls={`mobile-${index}`}
                    onClick={() => setMobileSection(mobileSection === index ? null : index)}
                  >
                    {item.label}
                    <span aria-hidden="true">{mobileSection === index ? '−' : '+'}</span>
                  </button>
                  {mobileSection === index && (
                    <div id={`mobile-${index}`}>
                      <Link href={item.href!} onClick={closeMobile}>
                        Explore all services →
                      </Link>
                      {item.groups.map((group) => (
                        <details key={group.title}>
                          <summary>{group.title}</summary>
                          <ul>
                            {group.items.map((link) => (
                              <li key={link.label}>
                                <Link href={link.href!} onClick={closeMobile}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href!} onClick={closeMobile}>
                  {item.label}
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
          ))}
          <details className="et-language-inline">
            <summary>English</summary>
            <p>English is currently the available site language.</p>
          </details>
          <Link className="et-button" href="/get-a-quote" onClick={closeMobile}>
            Get a Quote <ArrowRight size={18} />
          </Link>
        </nav>
      </dialog>
    </header>
  )
}
