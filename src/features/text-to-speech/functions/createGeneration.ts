import { requireSubscriptionAction } from '@/features/billing/middlewares/requireSubscription'
import { MAX_QUERY_LENGTH } from '@/features/text-to-speech/constants'
import { chatterbox } from '@/lib/chatterbox-client'
import { db } from '@/lib/drizzle'
import { generations } from '@/lib/drizzle/schemas/generations'
import { voices } from '@/lib/drizzle/schemas/voice'
import { polar } from '@/lib/polar'
import { uploadAudio } from '@/lib/r2'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, or } from 'drizzle-orm'
import { z } from 'zod'

const createGenerationInput = z.object({
  query: z.string().trim().min(1).max(MAX_QUERY_LENGTH),
  voiceId: z.string().trim().min(1),
  temperature: z.number().min(0).max(2).multipleOf(0.1).default(0.8),
  topP: z.number().min(0).max(1).multipleOf(0.05).default(0.95),
  topK: z.number().min(100).max(10000).multipleOf(100).default(100),
  repetitionPenalty: z.number().min(1).max(2).multipleOf(0.1).default(1.2),
})
export const createGeneration = createServerFn({ method: 'POST' })
  .middleware([requireSubscriptionAction])
  .inputValidator(createGenerationInput)
  .handler(async ({ data, context }) => {
    const voice = await db.query.voices.findFirst({
      where: and(
        eq(voices.id, data.voiceId),
        or(
          eq(voices.variant, 'System'),
          and(
            eq(voices.organizationId, context.orgId),
            eq(voices.variant, 'Custom'),
          ),
        ),
      ),
      columns: {
        id: true,
        name: true,
        r2ObjectKey: true,
      },
    })
    if (!voice) {
      throw new Error('Voice not found')
    } else if (!voice.r2ObjectKey) {
      throw new Error('Voice audio not found')
    } else {
      const { data: generation, error } = await chatterbox.POST('/generate', {
        body: {
          prompt: data.query,
          voice_key: voice.r2ObjectKey,
          temperature: data.temperature,
          top_p: data.topP,
          top_k: data.topK,
          repetition_penalty: data.repetitionPenalty,
          norm_loudness: true,
        },
        parseAs: 'arrayBuffer',
      })
      if (error) {
        if (error instanceof Error) {
          console.error('Error generating audio:', error.message)
          throw new Error('Failed to generate audio', { cause: error })
        } else {
          console.error('Error generating audio:', error)
          throw new Error('Failed to generate audio')
        }
      } else if (!(generation instanceof ArrayBuffer)) {
        throw new Error('Invalid audio data received')
      } else {
        const buffer = Buffer.from(generation)
        let generationId: string | null = null
        let r2ObjectKey: string | null = null
        try {
          const newGeneration = await db
            .insert(generations)
            .values({
              organizationId: context.orgId,
              prompt: data.query,
              voiceName: voice.name,
              voiceId: voice.id,
              temperature: data.temperature,
              topP: data.topP,
              topK: data.topK,
              repetitionPenalty: data.repetitionPenalty,
            })
            .returning({ id: generations.id })
          generationId = newGeneration[0].id
          r2ObjectKey = `organization/${context.orgId}/generations/${generationId}`
          await uploadAudio({
            buffer,
            key: r2ObjectKey,
            contentType: 'audio/wav',
          })
          await db
            .update(generations)
            .set({ r2ObjectKey })
            .where(
              and(
                eq(generations.id, generationId),
                eq(generations.organizationId, context.orgId),
              ),
            )
        } catch (e) {
          if (generationId) {
            await db
              .delete(generations)
              .where(
                and(
                  eq(generations.id, generationId),
                  eq(generations.organizationId, context.orgId),
                ),
              )
          }
          if (e instanceof Error) {
            throw e
          } else {
            throw new Error('Failed to save generation')
          }
        }
        if (!r2ObjectKey || !generationId) {
          throw new Error('Failed to save generation')
        } else {
          polar.events
            .ingest({
              events: [
                {
                  name: 'tts_generation',
                  externalCustomerId: context.orgId,
                  metadata: { characters: data.query.length },
                  timestamp: new Date(),
                },
              ],
            })
            .catch(() => {})
          return { generationId }
        }
      }
    }
  })
