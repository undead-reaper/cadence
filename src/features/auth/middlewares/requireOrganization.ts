import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/react-start'

export const requireOrganization = createServerFn().handler(async () => {
  const { isAuthenticated, userId, orgId } = await auth()
  if (!isAuthenticated) {
    throw redirect({ to: '/sign-in/$' })
  } else {
    if (!orgId) {
      throw redirect({ to: '/select-organization' })
    } else {
      return { userId, orgId }
    }
  }
})

export const requireOrganizationAction = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  const { isAuthenticated, userId, orgId } = await auth()
  if (!isAuthenticated) {
    throw redirect({ to: '/sign-in/$' })
  } else {
    if (!orgId) {
      throw redirect({ to: '/select-organization' })
    }
    return next({ context: { userId, orgId } })
  }
})
