import { getGenerationByIdQuery } from '@/features/text-to-speech/queries/getGenerationByIdQuery'
import TextToSpeechDetailsView from '@/features/text-to-speech/views/TextToSpeechDetailsView'
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
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.prefetchQuery(
      getGenerationByIdQuery({
        generationId: params.generationId,
        orgId: context.orgId,
      }),
    )
  },
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      getGenerationByIdQuery({
        generationId: params.generationId,
        orgId: context.orgId,
      }),
    )
  },
})

function RouteComponent() {
  return <TextToSpeechDetailsView />
}
