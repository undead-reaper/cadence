import { voiceCategories } from '@/lib/drizzle/schemas/voice'
import { z } from 'zod'

export const createVoiceFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  file: z
    .instanceof(File, { message: 'Audio file is required' })
    .nullable()
    .refine((f) => f !== null, 'An audio file is required'),
  category: z.enum(voiceCategories.enumValues),
  language: z.string().min(1, 'Language is required'),
  description: z.string(),
})

export type CreateVoiceFormData = z.input<typeof createVoiceFormSchema>
