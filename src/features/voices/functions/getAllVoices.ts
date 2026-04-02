import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { db } from '@/lib/drizzle'
import { voices } from '@/lib/drizzle/schemas/voice'
import { createServerFn } from '@tanstack/react-start'
import { and, asc, desc, eq, ilike, or } from 'drizzle-orm'
import { z } from 'zod'

const getAllVoicesInput = z
  .object({
    query: z.string().optional(),
  })
  .optional()

export const getAllVoices = createServerFn({ method: 'POST' })
  .middleware([requireOrganizationAction])
  .inputValidator(getAllVoicesInput)
  .handler(async ({ data, context }) => {
    const organizationId = context.orgId
    const searchFilter = data?.query
      ? or(
          ilike(voices.name, `%${data.query}%`),
          ilike(voices.description, `%${data.query}%`),
        )
      : undefined
    try {
      const [custom, system] = await Promise.all([
        db.query.voices.findMany({
          where: and(
            eq(voices.variant, 'Custom'),
            eq(voices.organizationId, organizationId),
            searchFilter,
          ),
          orderBy: desc(voices.createdAt),
          columns: {
            id: true,
            name: true,
            description: true,
            category: true,
            language: true,
            variant: true,
          },
        }),
        db.query.voices.findMany({
          where: and(eq(voices.variant, 'System'), searchFilter),
          orderBy: asc(voices.name),
          columns: {
            id: true,
            name: true,
            description: true,
            category: true,
            language: true,
            variant: true,
          },
        }),
      ])
      return { custom, system }
    } catch (error) {
      console.error('Error fetching voices:', error)
      throw new Error('Failed to fetch voices')
    }
  })
