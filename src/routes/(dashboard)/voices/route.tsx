import VoicesLayout from '@/features/voices/layouts/VoicesLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/voices')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VoicesLayout />
}
