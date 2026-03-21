import { Outlet } from '@tanstack/react-router'

const AuthLayout = () => {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <Outlet />
    </main>
  )
}

export default AuthLayout
