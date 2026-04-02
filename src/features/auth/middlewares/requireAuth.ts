import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/react-start'

export const requireAuth = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth()
  if (!isAuthenticated) {
    throw redirect({ to: '/sign-in/$' })
  } else {
    return { userId }
  }
})

export const requireAuthAction = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const { isAuthenticated, userId } = await auth()
    if (!isAuthenticated) {
      throw redirect({ to: '/sign-in/$' })
    } else {
      return next({ context: { userId } })
    }
  },
)
