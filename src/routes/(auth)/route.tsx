import AuthLayout from '@/features/auth/layouts/AuthLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthLayout />
}
