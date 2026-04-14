import { getAllVoicesQuery } from '@/features/voices/queries/getAllVoicesQuery'
import VoicesView from '@/features/voices/views/VoicesView'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const voicesSearchSchema = z.object({
  query: z.string().optional(),
})

export const Route = createFileRoute('/(dashboard)/voices/')({
  component: RouteComponent,
  validateSearch: voicesSearchSchema,
  beforeLoad: async ({ search, context }) => {
    await context.queryClient.prefetchQuery(
      getAllVoicesQuery({
        orgId: context.orgId,
        query: search.query,
      }),
    )
  },
  loaderDeps: ({ search }) => ({ query: search.query }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      getAllVoicesQuery({
        orgId: context.orgId,
        query: deps.query,
      }),
    )
  },
})

function RouteComponent() {
  return <VoicesView />
}
