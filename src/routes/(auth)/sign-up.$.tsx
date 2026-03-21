import { requireUnauth } from '@/features/auth/middlewares/requireUnauth'
import { SignUp } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up/$')({
  beforeLoad: async () => requireUnauth(),
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}
