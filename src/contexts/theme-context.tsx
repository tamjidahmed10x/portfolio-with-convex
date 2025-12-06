import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

export type ThemePalette = 'default' | 'mahogany' | 'olive' | 'fire' | 'crimson'

export interface ThemeConfig {
  mode: ThemeMode
  palette: ThemePalette
}

export interface ThemePaletteInfo {
  id: ThemePalette
  name: string
  description: string
  preview: {
    primary: string
    secondary: string
    accent: string
  }
}

export const themePalettes: ThemePaletteInfo[] = [
  {
    id: 'default',
    name: 'Emerald',
    description: 'Fresh green with cyan accents',
    preview: {
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#3b82f6',
    },
  },
  {
    id: 'mahogany',
    name: 'Mahogany',
    description: 'Rich wine red with deep cherry',
    preview: {
      primary: '#ad2831',
      secondary: '#800e13',
      accent: '#640d14',
    },
  },
  {
    id: 'olive',
    name: 'Olive',
    description: 'Natural earth tones with warmth',
    preview: {
      primary: '#606c38',
      secondary: '#bc6c25',
      accent: '#dda15e',
    },
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Blazing orange to golden amber',
    preview: {
      primary: '#e85d04',
      secondary: '#faa307',
      accent: '#ffba08',
    },
  },
  {
    id: 'crimson',
    name: 'Crimson',
    description: 'Bold crimson with ocean blue',
    preview: {
      primary: '#c1121f',
      secondary: '#003049',
      accent: '#669bbc',
    },
  },
]

interface ThemeContextType {
  theme: ThemeConfig
  actualMode: 'light' | 'dark'
  isTransitioning: boolean
  setMode: (mode: ThemeMode) => void
  setPalette: (palette: ThemePalette) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'portfolio-theme-config'
const TRANSITION_DURATION = 400 // ms

const getStoredTheme = (): ThemeConfig => {
  if (typeof window === 'undefined') {
    return { mode: 'light', palette: 'default' }
  }
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        mode: parsed.mode || 'light',
        palette: parsed.palette || 'default',
      }
    }
  } catch {
    // Ignore parse errors
  }
  return { mode: 'light', palette: 'default' }
}

const getSystemMode = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(getStoredTheme)
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(getSystemMode)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevModeRef = useRef<'light' | 'dark' | null>(null)

  const actualMode = theme.mode === 'system' ? systemMode : theme.mode

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document with transition overlay
  useEffect(() => {
    const root = document.documentElement

    // Check if mode is actually changing (not just initial load)
    const isModeChanging =
      prevModeRef.current !== null && prevModeRef.current !== actualMode

    if (isModeChanging) {
      // Start transition - disable all CSS transitions temporarily
      setIsTransitioning(true)
      root.classList.add('theme-switching')

      // Change theme immediately while overlay is visible
      requestAnimationFrame(() => {
        root.classList.remove('light', 'dark')
        root.classList.add(actualMode)

        // Re-enable transitions after theme is applied
        setTimeout(() => {
          root.classList.remove('theme-switching')
        }, 50)

        // End overlay transition
        setTimeout(() => {
          setIsTransitioning(false)
        }, TRANSITION_DURATION)
      })
    } else {
      // Initial load or palette change - no transition needed
      root.classList.remove('light', 'dark')
      root.classList.add(actualMode)
    }

    // Always update palette and store
    root.setAttribute('data-theme-palette', theme.palette)
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))

    // Update ref
    prevModeRef.current = actualMode
  }, [actualMode, theme.palette])

  const setMode = useCallback((mode: ThemeMode) => {
    setTheme((prev) => ({ ...prev, mode }))
  }, [])

  const setPalette = useCallback((palette: ThemePalette) => {
    setTheme((prev) => ({ ...prev, palette }))
  }, [])

  const toggleMode = useCallback(() => {
    setTheme((prev) => ({
      ...prev,
      mode:
        prev.mode === 'dark' ||
        (prev.mode === 'system' && getSystemMode() === 'dark')
          ? 'light'
          : 'dark',
    }))
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualMode,
        isTransitioning,
        setMode,
        setPalette,
        toggleMode,
      }}
    >
      {children}
      {/* Theme Transition Overlay */}
      <ThemeTransitionOverlay isActive={isTransitioning} mode={actualMode} />
    </ThemeContext.Provider>
  )
}

// Overlay component for smooth theme transitions
const ThemeTransitionOverlay = ({
  isActive,
  mode,
}: {
  isActive: boolean
  mode: 'light' | 'dark'
}) => {
  if (typeof window === 'undefined') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
        opacity: isActive ? 0.6 : 0,
        transition: `opacity ${TRANSITION_DURATION / 2}ms ease-in-out`,
      }}
      aria-hidden="true"
    />
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
