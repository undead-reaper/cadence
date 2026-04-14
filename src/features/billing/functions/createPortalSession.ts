import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { polar } from '@/lib/polar'
import { createServerFn } from '@tanstack/react-start'

export const createPortalSession = createServerFn()
  .middleware([requireOrganizationAction])
  .handler(async ({ context }) => {
    const result = await polar.customerSessions.create({
      externalCustomerId: context.orgId,
    })
    if (!result.customerPortalUrl) {
      throw new Error('Failed to create portal session')
    }
    return { portalUrl: result.customerPortalUrl }
  })
