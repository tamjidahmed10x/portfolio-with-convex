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

export type ThemePalette =
  | 'default'
  | 'mahogany'
  | 'olive'
  | 'fire'
  | 'crimson'
  | 'forest'
  | 'wine'
  | 'midnight'
  | 'rose'
  | 'ocean'
  | 'earth'

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
    id: 'earth',
    name: 'Earth',
    description: 'Rich earth tones and clay soil',
    preview: {
      primary: '#774936',
      secondary: '#5c3324',
      accent: '#653a2a',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep ocean blue to sky blue',
    preview: {
      primary: '#2a6f97',
      secondary: '#61a5c2',
      accent: '#89c2d9',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Deep forest greens and mossy tones',
    preview: {
      primary: '#538d22',
      secondary: '#73a942',
      accent: '#aad576',
    },
  },
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
  {
    id: 'wine',
    name: 'Wine',
    description: 'Dark wine with cherry accents',
    preview: {
      primary: '#ad2831',
      secondary: '#640d14',
      accent: '#800e13',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep blue slate with eggshell',
    preview: {
      primary: '#3e5c76',
      secondary: '#1d2d44',
      accent: '#748cab',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Smoky rose with rosy copper',
    preview: {
      primary: '#d66853',
      secondary: '#7d4e57',
      accent: '#364156',
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
    return { mode: 'system', palette: 'mahogany' }
  }
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        mode: parsed.mode || 'system',
        palette: parsed.palette || 'mahogany',
      }
    }
  } catch {
    // Ignore parse errors
  }
  return { mode: 'system', palette: 'mahogany' }
}

const getSystemMode = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Get initial mode from document (set by inline script) to prevent flash
const getInitialMode = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from stored theme - the inline script already applied it to DOM
  const [theme, setTheme] = useState<ThemeConfig>(getStoredTheme)
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(getSystemMode)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Initialize prevModeRef with current DOM state to prevent initial flash
  const prevModeRef = useRef<'light' | 'dark' | null>(
    typeof window !== 'undefined' ? getInitialMode() : null,
  )

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
