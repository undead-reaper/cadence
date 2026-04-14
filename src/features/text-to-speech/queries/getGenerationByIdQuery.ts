import { queryOptions } from '@tanstack/react-query'
import { getGenerationById } from '@/features/text-to-speech/functions/getGenerationById'
import { getAllVoices } from '@/features/voices/functions/getAllVoices'
import { getAllGenerationsByOrganizationId } from '@/features/text-to-speech/functions/getAllGenerationsByOrganizationId'

type GetGenerationByIdOptions = {
  generationId: string
  orgId: string
}
export const getGenerationByIdQuery = ({
  generationId,
  orgId,
}: GetGenerationByIdOptions) =>
  queryOptions({
    queryKey: ['text-to-speech', 'generation', generationId, orgId],
    queryFn: async () => {
      const [generation, { system, custom }, generations] = await Promise.all([
        getGenerationById({ data: { generationId } }),
        getAllVoices(),
        getAllGenerationsByOrganizationId(),
      ])
      return { generation, custom, system, generations }
    },
  })
