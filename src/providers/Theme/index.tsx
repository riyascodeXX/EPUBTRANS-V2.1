'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'
import type { Theme, ThemeContextType } from './types'
import { defaultTheme, themeCookieKey, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: defaultTheme,
}

const ThemeContext = createContext(initialContext)

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0e1b19' : '#f4f2eb')
}
function saveCookie(theme: Theme) {
  document.cookie = `${themeCookieKey}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
}
export const ThemeProvider = ({
  children,
  initialTheme = defaultTheme,
}: {
  children: React.ReactNode
  initialTheme?: Theme
}) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  const setTheme = useCallback((themeToSet: Theme | null) => {
    const next = themeToSet ?? defaultTheme
    applyTheme(next)
    setThemeState(next)
    saveCookie(next)
    try {
      window.localStorage.setItem(themeLocalStorageKey, next)
    } catch {
      /* The toggle works even when browser storage is unavailable. */
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== themeLocalStorageKey && event.key !== null) return
      const next = themeIsValid(event.newValue) ? event.newValue : defaultTheme
      applyTheme(next)
      setThemeState(next)
      saveCookie(next)
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
