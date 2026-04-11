import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { db } from '@/lib/drizzle'
import { generations } from '@/lib/drizzle/schemas/generations'
import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'

export const getAllGenerationsByOrganizationId = createServerFn({
  method: 'GET',
})
  .middleware([requireOrganizationAction])
  .handler(async ({ context }) => {
    const result = await db.query.generations.findMany({
      where: eq(generations.organizationId, context.orgId),
      orderBy: desc(generations.createdAt),
      columns: {
        organizationId: false,
        r2ObjectKey: false,
      },
    })
    return result
  })
