import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { db } from '@/lib/drizzle'
import { generations } from '@/lib/drizzle/schemas/generations'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const getGeneratioByIdInput = z.object({
  generationId: z.string(),
})
export const getGenerationById = createServerFn({ method: 'POST' })
  .middleware([requireOrganizationAction])
  .inputValidator(getGeneratioByIdInput)
  .handler(async ({ data, context }) => {
    const generation = await db.query.generations.findFirst({
      where: and(
        eq(generations.id, data.generationId),
        eq(generations.organizationId, context.orgId),
      ),
      columns: {
        organizationId: false,
        r2ObjectKey: false,
      },
    })
    if (!generation) {
      throw new Error('Generation not found')
    } else {
      return { ...generation, audioUrl: `/api/audio/${generation.id}` }
    }
  })
