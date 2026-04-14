import { createMiddleware } from '@tanstack/react-start'
import { getSubscriptionStatus } from '../functions/getSubscriptionStatus'
import {
  requireOrganizationAction,
  requireOrganizationRequest,
} from '@/features/auth/middlewares/requireOrganization'

export const requireSubscriptionAction = createMiddleware({
  type: 'function',
})
  .middleware([requireOrganizationAction])
  .server(async ({ next, context }) => {
    const subscriptionStatus = await getSubscriptionStatus()
    if (!subscriptionStatus.hasActiveSubscription) {
      throw new Error(
        'An active subscription is required to perform this action.',
      )
    } else {
      return next({ context: { subscriptionStatus, ...context } })
    }
  })

export const requireSubscriptionRequest = createMiddleware({
  type: 'request',
})
  .middleware([requireOrganizationRequest])
  .server(async ({ next, context }) => {
    const subscriptionStatus = await getSubscriptionStatus()
    if (!subscriptionStatus.hasActiveSubscription) {
      return Response.json(
        {
          error: 'An active subscription is required to perform this action.',
        },
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } else {
      return next({ context: { subscriptionStatus, ...context } })
    }
  })
