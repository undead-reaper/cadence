import { getAllVoices } from '@/features/voices/functions/getAllVoices'
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
    const voices = await getAllVoices({ data: { query: search.query } })
    return { context: { voices, ...context } }
  },
  loader: async ({ context }) => {
    return context
  },
})

function RouteComponent() {
  return <VoicesView />
}
