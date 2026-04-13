import { requireOrganizationRequest } from '@/features/auth/middlewares/requireOrganization'
import { db } from '@/lib/drizzle'
import { voices } from '@/lib/drizzle/schemas/voice'
import { getSignedAudioUrl } from '@/lib/r2'
import { createFileRoute } from '@tanstack/react-router'
import { fetch } from 'bun'
import { and, eq, or } from 'drizzle-orm'
import { z } from 'zod'

export const Route = createFileRoute('/api/voices/$voiceId')({
  params: z.object({
    voiceId: z.string(),
  }),
  server: {
    middleware: [requireOrganizationRequest],
    handlers: {
      GET: async ({ params, context }) => {
        const voice = await db.query.voices.findFirst({
          where: or(
            and(eq(voices.variant, 'System'), eq(voices.id, params.voiceId)),
            and(
              eq(voices.variant, 'Custom'),
              eq(voices.id, params.voiceId),
              eq(voices.organizationId, context.orgId),
            ),
          ),
          columns: {
            variant: true,
            organizationId: true,
            r2ObjectKey: true,
          },
        })
        if (
          !voice ||
          (voice.variant === 'Custom' && voice.organizationId !== context.orgId)
        ) {
          return new Response('Voice not found', { status: 404 })
        } else if (!voice.r2ObjectKey) {
          return new Response('Voice audio not found', { status: 409 })
        } else {
          const signedUrl = await getSignedAudioUrl({ key: voice.r2ObjectKey })
          const audioResponse = await fetch(signedUrl)
          if (!audioResponse.ok) {
            return new Response('Failed to fetch voice audio', { status: 502 })
          } else {
            const contentType =
              audioResponse.headers.get('Content-Type') || 'audio/wav'
            return new Response(audioResponse.body, {
              headers: {
                'Content-Type': contentType,
                'Cache-Control':
                  voice.variant === 'System'
                    ? 'public, max-age=86400'
                    : 'private, max-age=3600',
              },
            })
          }
        }
      },
    },
  },
})
