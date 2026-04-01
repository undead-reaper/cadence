import { z } from 'zod'
import { MAX_QUERY_LENGTH } from '../constants'

export const ttsFormSchema = z.object({
  query: z.string().min(1).max(MAX_QUERY_LENGTH),
  voiceId: z.string().min(1),
  temperature: z.number().min(0).max(2).step(0.1),
  topP: z.number().min(0).max(1).step(0.05),
  topK: z.number().min(1).max(10000).step(100),
  repetitionPenalty: z.number().min(1).max(2).step(0.1),
})

export type TTSFormData = z.infer<typeof ttsFormSchema>
