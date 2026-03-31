import { requireOrganization } from '@/features/auth/middlewares/requireOrganization'
import HomeView from '@/features/dashboard/views/HomeView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/')({
  beforeLoad: async () => requireOrganization(),
  component: App,
})

function App() {
  return <HomeView />
}
