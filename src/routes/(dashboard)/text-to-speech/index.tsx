import TextToSpeechView from '@/features/text-to-speech/views/TextToSpeechView'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { getAllVoicesAndGenerationsQuery } from '@/features/text-to-speech/queries/getAllVoicesAndGenerationsQuery'

const textToSpeechSearchSchema = z.object({
  query: z.string().optional(),
  voiceId: z.string().optional(),
})

export const Route = createFileRoute('/(dashboard)/text-to-speech/')({
  validateSearch: textToSpeechSearchSchema,
  beforeLoad: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      getAllVoicesAndGenerationsQuery({ orgId: context.orgId }),
    )
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getAllVoicesAndGenerationsQuery({ orgId: context.orgId }),
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <TextToSpeechView />
}
