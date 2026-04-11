import { requireOrganizationRequest } from '@/features/auth/middlewares/requireOrganization'
import { db } from '@/lib/drizzle'
import { generations } from '@/lib/drizzle/schemas/generations'
import { getSignedAudioUrl } from '@/lib/r2'
import { createFileRoute } from '@tanstack/react-router'
import { fetch } from 'bun'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export const Route = createFileRoute('/api/audio/$generationId')({
  params: z.object({
    generationId: z.string(),
  }),
  server: {
    middleware: [requireOrganizationRequest],
    handlers: {
      GET: async ({ context, params }) => {
        const generation = await db.query.generations.findFirst({
          where: and(
            eq(generations.id, params.generationId),
            eq(generations.organizationId, context.orgId),
          ),
        })
        if (!generation) {
          return new Response('Generation not found', { status: 404 })
        } else if (!generation.r2ObjectKey) {
          return new Response('Audio not found', { status: 404 })
        } else {
          const signedUrl = await getSignedAudioUrl({
            key: generation.r2ObjectKey,
          })
          const audioResponse = await fetch(signedUrl)
          if (!audioResponse.ok) {
            return new Response('Failed to fetch audio', { status: 502 })
          } else {
            return new Response(audioResponse.body, {
              headers: {
                'Content-Type': 'audio/wav',
                'Cache-Control': 'private, max-age=3600',
              },
            })
          }
        }
      },
    },
  },
})
