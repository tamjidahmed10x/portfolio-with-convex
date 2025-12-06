import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'

import ConvexProvider from '../integrations/convex/provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import { ThemeProvider } from '../contexts/theme-context'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

// Inline script to prevent theme flash on page load
// This runs before React hydration to set the correct theme immediately
const themeInitScript = `
(function() {
  // Add loading class to disable transitions during initial load
  document.documentElement.classList.add('theme-loading');
  
  try {
    var stored = localStorage.getItem('portfolio-theme-config');
    var theme = stored ? JSON.parse(stored) : { mode: 'system', palette: 'mahogany' };
    var mode = theme.mode;
    var palette = theme.palette || 'mahogany';
    
    if (mode === 'system') {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    document.documentElement.classList.add(mode);
    document.documentElement.setAttribute('data-theme-palette', palette);
  } catch (e) {
    var systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.add(systemMode);
    document.documentElement.setAttribute('data-theme-palette', 'mahogany');
  }
  
  // Remove loading class after a short delay to enable transitions
  // This happens before React hydration completes
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      document.documentElement.classList.remove('theme-loading');
    });
  });
})();
`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Inline script to set theme before paint - prevents flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <ConvexProvider>
            <Header />
            <main className="">{children}</main>
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
        <Scripts />
      </body>
    </html>
  )
}
