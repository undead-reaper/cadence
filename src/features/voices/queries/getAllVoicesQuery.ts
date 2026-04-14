import { getAllVoices } from '@/features/voices/functions/getAllVoices'
import { queryOptions } from '@tanstack/react-query'

type GetAllVoicesQueryOptions = {
  orgId: string
  query: string | undefined
}
export const getAllVoicesQuery = ({ orgId, query }: GetAllVoicesQueryOptions) =>
  queryOptions({
    queryKey: ['voices', orgId, query],
    queryFn: () => getAllVoices({ data: { query } }),
  })
