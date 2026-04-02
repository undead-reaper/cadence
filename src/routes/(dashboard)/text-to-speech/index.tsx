import TextToSpeechView from '@/features/text-to-speech/views/TextToSpeechView'
import { getAllVoices } from '@/features/voices/functions/getAllVoices'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const textToSpeechSearchSchema = z.object({
  query: z.string().optional(),
  voiceId: z.string().optional(),
})
export const Route = createFileRoute('/(dashboard)/text-to-speech/')({
  validateSearch: textToSpeechSearchSchema,
  beforeLoad: async () => {
    const { custom, system } = await getAllVoices()
    return { custom, system }
  },
  loader: async ({ context }) => {
    return { context }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <TextToSpeechView />
}
