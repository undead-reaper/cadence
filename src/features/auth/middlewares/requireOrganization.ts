import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

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
