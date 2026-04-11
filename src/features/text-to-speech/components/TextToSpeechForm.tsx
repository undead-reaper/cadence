import { createGeneration } from '@/features/text-to-speech/functions/createGeneration'
import type { TTSFormData } from '@/features/text-to-speech/types/ttsFormSchema'
import { ttsFormSchema } from '@/features/text-to-speech/types/ttsFormSchema'
import { useAppForm } from '@/hooks/use-app-form'
import { formOptions } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { toast } from 'sonner'

export const defaultTTSValues: TTSFormData = {
  query: '',
  voiceId: '',
  temperature: 0.8,
  topP: 0.95,
  topK: 100,
  repetitionPenalty: 1.2,
}

export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
})

type Props = Readonly<{
  children: ReactNode
  defaultValues?: TTSFormData
}>
const TextToSpeechForm = ({ children, defaultValues }: Props) => {
  const navigate = useNavigate()
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues || defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await createGeneration({
          data: {
            query: value.query.trim(),
            voiceId: value.voiceId,
            temperature: value.temperature,
            topP: value.topP,
            topK: value.topK,
            repetitionPenalty: value.repetitionPenalty,
          },
        })
        toast.success('Voice Generated Successfully', {
          description: 'You can now preview your generated voice.',
        })
        await navigate({
          to: '/text-to-speech/$generationId',
          params: { generationId: result.generationId },
        })
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Failed to Generate Voice', {
            description: error.message,
          })
        } else {
          toast.error('Failed to Generate Voice', {
            description: 'Please try again later.',
          })
        }
      }
    },
  })

  return <form.AppForm>{children}</form.AppForm>
}

export default TextToSpeechForm
