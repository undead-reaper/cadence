import { getAllVoices } from '@/features/voices/functions/getAllVoices'
import { queryOptions } from '@tanstack/react-query'
import { getAllGenerationsByOrganizationId } from '@/features/text-to-speech/functions/getAllGenerationsByOrganizationId'

type GetAllVoicesAndGenerationsOptions = {
  orgId: string
}
export const getAllVoicesAndGenerationsQuery = ({
  orgId,
}: GetAllVoicesAndGenerationsOptions) =>
  queryOptions({
    queryKey: ['text-to-speech', 'voices-generations', orgId],
    queryFn: async () => {
      const [
        { custom: suspenseCustomVoices, system: suspenseSystemVoices },
        suspenseGenerations,
      ] = await Promise.all([
        getAllVoices(),
        getAllGenerationsByOrganizationId(),
      ])

      return {
        customVoices: suspenseCustomVoices,
        systemVoices: suspenseSystemVoices,
        generations: suspenseGenerations,
      }
    },
  })
