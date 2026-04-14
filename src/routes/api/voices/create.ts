import { voiceCategories, voices } from '@/lib/drizzle/schemas/voice'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { parseBuffer } from 'music-metadata'
import { db } from '@/lib/drizzle'
import { uploadAudio } from '@/lib/r2'
import { and, eq } from 'drizzle-orm'
import { requireSubscriptionRequest } from '@/features/billing/middlewares/requireSubscription'
import { polar } from '@/lib/polar'

const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024 // 20MB
const MIN_AUDIO_DURATION_SECONDS = 10 // 1 second

const searchParamsParser = z.object({
  name: z.string().min(1, 'Voice name is required'),
  categories: z.enum(voiceCategories.enumValues),
  language: z.string().min(1, 'Language is required'),
  description: z.string().nullish(),
})

export const Route = createFileRoute('/api/voices/create')({
  validateSearch: searchParamsParser,
  server: {
    middleware: [requireSubscriptionRequest],
    handlers: {
      POST: async ({ context, request }) => {
        const url = new URL(request.url)
        const searchParams = searchParamsParser.parse(
          Object.fromEntries(url.searchParams),
        )

        const fileBuffer = await request.arrayBuffer()
        if (!fileBuffer.byteLength) {
          return Response.json(
            {
              error: 'Audio file is required',
            },
            {
              status: 400,
            },
          )
        } else if (fileBuffer.byteLength > MAX_UPLOAD_SIZE_BYTES) {
          return Response.json(
            {
              error: 'Audio file is too large',
            },
            {
              status: 413,
            },
          )
        } else {
          const contentType = request.headers.get('Content-Type')
          if (!contentType) {
            return Response.json(
              {
                error: 'Content-Type header is required',
              },
              {
                status: 400,
              },
            )
          } else {
            const normalizedContentType = contentType.split(';')[0].trim()
            let duration: number
            try {
              const metadata = await parseBuffer(
                new Uint8Array(fileBuffer),
                { mimeType: normalizedContentType },
                { duration: true },
              )
              duration = metadata.format.duration ?? 0
            } catch (error) {
              return Response.json(
                {
                  error: 'Failed to parse audio file',
                },
                {
                  status: 422,
                },
              )
            }
            if (duration < MIN_AUDIO_DURATION_SECONDS) {
              return Response.json(
                {
                  error: `Audio file is too short. Minimum duration is ${MIN_AUDIO_DURATION_SECONDS} seconds.`,
                },
                {
                  status: 422,
                },
              )
            } else {
              let createdVoiceId: string | null = null
              try {
                const [voice] = await db
                  .insert(voices)
                  .values({
                    variant: 'Custom',
                    ...searchParams,
                    name: searchParams.name,
                    category: searchParams.categories,
                    organizationId: context.orgId,
                  })
                  .returning({ id: voices.id })
                createdVoiceId = voice.id
                const r2ObjectKey = `organization/${context.orgId}/generations/${createdVoiceId}`
                await uploadAudio({
                  buffer: Buffer.from(fileBuffer),
                  key: r2ObjectKey,
                  contentType: normalizedContentType,
                })
                await db
                  .update(voices)
                  .set({ r2ObjectKey })
                  .where(
                    and(
                      eq(voices.id, voice.id),
                      eq(voices.organizationId, context.orgId),
                    ),
                  )
              } catch (error) {
                if (createdVoiceId) {
                  await db
                    .delete(voices)
                    .where(
                      and(
                        eq(voices.id, createdVoiceId),
                        eq(voices.organizationId, context.orgId),
                      ),
                    )
                    .catch(() => {})
                }
                return Response.json(
                  {
                    error: 'Failed to create voice',
                  },
                  {
                    status: 500,
                  },
                )
              }
            }
          }
        }

        polar.events
          .ingest({
            events: [
              {
                name: 'voice_creation',
                externalCustomerId: context.orgId,
                timestamp: new Date(),
              },
            ],
          })
          .catch(() => {})

        return Response.json(
          {
            message: 'Voice created successfully',
          },
          {
            status: 201,
          },
        )
      },
    },
  },
})
