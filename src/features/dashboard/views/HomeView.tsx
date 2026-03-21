import { OrganizationSwitcher, UserButton } from '@clerk/tanstack-react-start'

const HomeView = () => {
  return (
    <main className="flex flex-col items-center gap-4 justify-center h-screen w-full">
      <h1 className="text-2xl font-semibold">Welcome to Cadence</h1>
      <div className="flex items-center gap-4">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </main>
  )
}

export default HomeView
