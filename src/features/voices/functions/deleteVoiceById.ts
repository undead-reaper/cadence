import { requireOrganizationAction } from '@/features/auth/middlewares/requireOrganization'
import { db } from '@/lib/drizzle'
import { voices } from '@/lib/drizzle/schemas/voice'
import { deleteAudio } from '@/lib/r2'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const deleteVoiceByIdInput = z.object({
  voiceId: z.string(),
})
export const deleteVoiceById = createServerFn({ method: 'POST' })
  .middleware([requireOrganizationAction])
  .inputValidator(deleteVoiceByIdInput)
  .handler(async ({ data, context }) => {
    const voice = await db.query.voices.findFirst({
      where: and(
        eq(voices.id, data.voiceId),
        eq(voices.organizationId, context.orgId),
        eq(voices.variant, 'Custom'),
      ),
      columns: { r2ObjectKey: true, id: true },
    })
    if (!voice) {
      throw new Error(
        "Voice not found or you don't have permission to delete it.",
      )
    } else {
      await db
        .delete(voices)
        .where(
          and(
            eq(voices.id, data.voiceId),
            eq(voices.organizationId, context.orgId),
            eq(voices.variant, 'Custom'),
          ),
        )
    }
    if (voice.r2ObjectKey) {
      await deleteAudio({ key: voice.r2ObjectKey })
    }
    return { success: true }
  })
