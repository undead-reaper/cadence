import { getAllGenerationsByOrganizationId } from '@/features/text-to-speech/functions/getAllGenerationsByOrganizationId'
import { getGenerationById } from '@/features/text-to-speech/functions/getGenerationById'
import TextToSpeechDetailsView from '@/features/text-to-speech/views/TextToSpeechDetailsView'
import { getAllVoices } from '@/features/voices/functions/getAllVoices'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const TextToSpeechGenerationParams = z.object({
  generationId: z.string(),
})
export const Route = createFileRoute(
  '/(dashboard)/text-to-speech/$generationId',
)({
  params: TextToSpeechGenerationParams,
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const { generationId } = params
    const [generation, { system, custom }, generations] = await Promise.all([
      getGenerationById({ data: { generationId } }),
      getAllVoices(),
      getAllGenerationsByOrganizationId(),
    ])
    return { context: { generation, custom, system, generations } }
  },
  loader: async ({ context }) => {
    return context
  },
})

function RouteComponent() {
  return <TextToSpeechDetailsView />
}
