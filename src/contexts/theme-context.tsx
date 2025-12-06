import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'

export type ThemeMode = 'light' | 'dark'

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

// Default theme values - used when URL has no theme params
export const DEFAULT_MODE: ThemeMode = 'light'
export const DEFAULT_PALETTE: ThemePalette = 'mahogany'

// Valid values for validation
const VALID_MODES: ThemeMode[] = ['light', 'dark']
const VALID_PALETTES: ThemePalette[] = [
  'default',
  'mahogany',
  'olive',
  'fire',
  'crimson',
  'forest',
  'wine',
  'midnight',
  'rose',
  'ocean',
  'earth',
]

// Helper to validate mode
export const isValidMode = (mode: unknown): mode is ThemeMode => {
  return typeof mode === 'string' && VALID_MODES.includes(mode as ThemeMode)
}

// Helper to validate palette
export const isValidPalette = (palette: unknown): palette is ThemePalette => {
  return (
    typeof palette === 'string' &&
    VALID_PALETTES.includes(palette as ThemePalette)
  )
}

// Parse theme from search params (works on server and client)
export const parseThemeFromSearch = (
  search: Record<string, unknown>,
): ThemeConfig => {
  const mode = isValidMode(search.mode) ? search.mode : DEFAULT_MODE
  const palette = isValidPalette(search.palette)
    ? search.palette
    : DEFAULT_PALETTE
  return { mode, palette }
}

interface ThemeContextType {
  theme: ThemeConfig
  setMode: (mode: ThemeMode) => void
  setPalette: (palette: ThemePalette) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const TRANSITION_DURATION = 300 // ms

interface ThemeProviderProps {
  children: ReactNode
  initialTheme: ThemeConfig
}

export const ThemeProvider = ({
  children,
  initialTheme,
}: ThemeProviderProps) => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as Record<string, unknown>

  const [theme, setTheme] = useState<ThemeConfig>(initialTheme)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevModeRef = useRef<ThemeMode>(initialTheme.mode)
  const isFirstRender = useRef(true)

  // Sync theme from URL search params
  useEffect(() => {
    const urlTheme = parseThemeFromSearch(search)

    // Only update if different from current theme
    if (urlTheme.mode !== theme.mode || urlTheme.palette !== theme.palette) {
      setTheme(urlTheme)
    }
  }, [search])

  // Apply theme to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement

    // Check if mode is actually changing (not just initial load or palette change)
    const isModeChanging =
      !isFirstRender.current && prevModeRef.current !== theme.mode

    if (isModeChanging) {
      // Start transition
      setIsTransitioning(true)
      root.classList.add('theme-switching')

      // Change theme immediately while overlay is visible
      requestAnimationFrame(() => {
        root.classList.remove('light', 'dark')
        root.classList.add(theme.mode)

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
      root.classList.add(theme.mode)
    }

    // Always update palette
    root.setAttribute('data-theme-palette', theme.palette)

    // Update refs
    prevModeRef.current = theme.mode
    isFirstRender.current = false
  }, [theme.mode, theme.palette])

  // Navigate to update URL with new theme
  const updateThemeInUrl = useCallback(
    (newMode: ThemeMode, newPalette: ThemePalette) => {
      navigate({
        to: '.',
        search: (prev) => {
          const newSearch: Record<string, unknown> = { ...prev }

          // Only add mode to URL if it's not default
          if (newMode !== DEFAULT_MODE) {
            newSearch.mode = newMode
          } else {
            delete newSearch.mode
          }

          // Only add palette to URL if it's not default
          if (newPalette !== DEFAULT_PALETTE) {
            newSearch.palette = newPalette
          } else {
            delete newSearch.palette
          }

          return newSearch
        },
        replace: true,
      })
    },
    [navigate],
  )

  const setMode = useCallback(
    (mode: ThemeMode) => {
      if (mode !== theme.mode) {
        setTheme((prev) => ({ ...prev, mode }))
        updateThemeInUrl(mode, theme.palette)
      }
    },
    [theme.mode, theme.palette, updateThemeInUrl],
  )

  const setPalette = useCallback(
    (palette: ThemePalette) => {
      if (palette !== theme.palette) {
        setTheme((prev) => ({ ...prev, palette }))
        updateThemeInUrl(theme.mode, palette)
      }
    },
    [theme.mode, theme.palette, updateThemeInUrl],
  )

  const toggleMode = useCallback(() => {
    const newMode = theme.mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
  }, [theme.mode, setMode])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setMode,
        setPalette,
        toggleMode,
      }}
    >
      {children}
      {/* Theme Transition Overlay */}
      <ThemeTransitionOverlay isActive={isTransitioning} mode={theme.mode} />
    </ThemeContext.Provider>
  )
}

// Overlay component for smooth theme transitions
const ThemeTransitionOverlay = ({
  isActive,
  mode,
}: {
  isActive: boolean
  mode: ThemeMode
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
