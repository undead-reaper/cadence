import { requireUnauth } from '@/features/auth/middlewares/requireUnauth'
import { SignIn } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-in/$')({
  beforeLoad: async () => requireUnauth(),
  component: RouteComponent,
})

function RouteComponent() {
  return <SignIn />
}
