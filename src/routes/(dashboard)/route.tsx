import { requireOrganization } from '@/features/auth/middlewares/requireOrganization'
import DashboardLayout from '@/features/dashboard/layouts/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)')({
  beforeLoad: async () => requireOrganization(),
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardLayout />
}
