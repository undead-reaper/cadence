import { requireAuth } from '@/features/auth/middlewares/requireAuth'
import { OrganizationList } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/select-organization')({
  beforeLoad: async () => requireAuth(),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
    />
  )
}
