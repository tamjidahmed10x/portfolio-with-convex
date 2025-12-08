import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  retainSearchParams,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { MotionConfig } from 'motion/react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import ConvexProvider from '../integrations/convex/provider'
import 'mac-scrollbar/dist/mac-scrollbar.css'
import { GlobalScrollbar } from 'mac-scrollbar'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { useIsMobile } from '../hooks/use-is-mobile'

import {
  ThemeProvider,
  parseThemeFromSearch,
  isValidMode,
  isValidPalette,
  type ThemeMode,
  type ThemePalette,
} from '../contexts/theme-context'

import { generateHomeSEO } from '../lib/seo'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

// Search params schema for theme
interface ThemeSearchParams {
  mode?: ThemeMode
  palette?: ThemePalette
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  // Validate and parse search params for theme
  validateSearch: (search: Record<string, unknown>): ThemeSearchParams => {
    return {
      mode: isValidMode(search.mode) ? search.mode : undefined,
      palette: isValidPalette(search.palette) ? search.palette : undefined,
    }
  },

  // Retain theme search params across all navigations
  search: {
    middlewares: [retainSearchParams(['mode', 'palette'])],
  },

  head: () => {
    const { meta, links } = generateHomeSEO()
    return {
      meta,
      links: [{ rel: 'stylesheet', href: appCss }, ...links],
    }
  },

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Get search params from the route
  const search = Route.useSearch()

  // Parse theme from search params
  const initialTheme = parseThemeFromSearch(search as Record<string, unknown>)

  // Disable GlobalScrollbar on mobile devices
  const isMobile = useIsMobile()

  return (
    <html lang="en" className={initialTheme.mode}>
      <head>
        <HeadContent />
        {/* Inline script to apply theme class immediately - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var root = document.documentElement;
                // Theme is already set via className on html tag from SSR
                // Just ensure palette attribute is set
                root.setAttribute('data-theme-palette', '${initialTheme.palette}');
              })();
            `,
          }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <ThemeProvider initialTheme={initialTheme}>
            <ConvexProvider>
              <Header />
              <main className="">{children}</main>
              <Footer />
              {!isMobile && <GlobalScrollbar />}
              <TanStackDevtools
                config={{
                  position: 'bottom-right',
                }}
                plugins={[
                  {
                    name: 'Tanstack Router',
                    render: <TanStackRouterDevtoolsPanel />,
                  },
                  TanStackQueryDevtools,
                ]}
              />
            </ConvexProvider>
          </ThemeProvider>
        </MotionConfig>
        <Scripts />
      </body>
    </html>
  )
}
