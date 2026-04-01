import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().optional(),
})
export const Route = createFileRoute('/(dashboard)/text-to-speech')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  return <main></main>
}
