import GlobalErrorComponent from '@/components/GlobalErrorComponent'
import PendingComponent from '@/components/PendingComponent'
import { routeTree } from '@/routeTree.gen'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: GlobalErrorComponent,
    defaultPendingComponent: PendingComponent,
    defaultPendingMinMs: 300,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
