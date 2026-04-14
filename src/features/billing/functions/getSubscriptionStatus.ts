import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { polar } from '@/lib/polar'
import { createServerFn } from '@tanstack/react-start'

export const getSubscriptionStatus = createServerFn({ method: 'GET' })
  .middleware([requireOrganizationAction])
  .handler(async ({ context }) => {
    try {
      const customerState = await polar.customers.getStateExternal({
        externalId: context.orgId,
      })
      const hasActiveSubscription = customerState.activeSubscriptions.length > 0
      let estimatedCostCents = 0
      for (const subscription of customerState.activeSubscriptions) {
        for (const meter of subscription.meters) {
          estimatedCostCents += meter.amount
        }
      }
      return {
        hasActiveSubscription,
        estimatedCostCents,
        customerId: customerState.id,
      }
    } catch (error) {
      return {
        hasActiveSubscription: false,
        customerId: null,
        estimatedCostCents: 0,
      }
    }
  })
