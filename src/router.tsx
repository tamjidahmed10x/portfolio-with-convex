import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { ThemeLink } from './components/theme-link'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

const ErrorComponent = ({ error }: { error: unknown }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">An error occurred</h1>
      <pre className="whitespace-pre-wrap break-all">{String(error)}</pre>
    </div>
  )
}

const NotFoundComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <ThemeLink
        to="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        Go back home
      </ThemeLink>
    </div>
  )
}
// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      )
    },
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
    defaultNotFoundComponent: NotFoundComponent,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
