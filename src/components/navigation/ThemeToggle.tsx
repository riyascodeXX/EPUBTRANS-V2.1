'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/Theme'

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme()
  if (compact)
    return (
      <button
        type="button"
        className="et-theme-toggle-compact"
        data-no-translate
        aria-label={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
        title={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )}
      </button>
    )
  return (
    <div className="et-theme-toggle" role="group" aria-label="Color theme" data-no-translate>
      <button
        type="button"
        aria-label="Use light theme"
        title="Light theme"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
      >
        <Sun size={15} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        title="Dark theme"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
      >
        <Moon size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
