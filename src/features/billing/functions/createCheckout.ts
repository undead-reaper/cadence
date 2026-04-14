import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { serverEnv } from '@/lib/env/server'
import { polar } from '@/lib/polar'
import { createServerFn } from '@tanstack/react-start'

export const createCheckout = createServerFn()
  .middleware([requireOrganizationAction])
  .handler(async ({ context }) => {
    const result = await polar.checkouts.create({
      products: [serverEnv.POLAR_PRODUCT_ID],
      externalCustomerId: context.orgId,
      returnUrl: serverEnv.BASE_URL,
    })
    if (!result.url) {
      throw new Error('Failed to create checkout')
    }
    return { checkoutUrl: result.url }
  })
