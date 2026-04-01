import type { TTSFormData } from '@/features/text-to-speech/types/ttsFormSchema'
import { ttsFormSchema } from '@/features/text-to-speech/types/ttsFormSchema'
import { useAppForm } from '@/hooks/use-app-form'
import { formOptions } from '@tanstack/react-form'
import type { ReactNode } from 'react'

export const defaultTTSValues: TTSFormData = {
  query: '',
  voiceId: '',
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
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
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues || defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log('Form submitted with values:', value)
    },
  })

  return <form.AppForm>{children}</form.AppForm>
}

export default TextToSpeechForm
