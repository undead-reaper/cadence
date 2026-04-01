import PageHeader from '@/components/PageHeader'
import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import QueryTextInput from '@/features/dashboard/components/QueryTextInput'
import QuickActionsPanel from '@/features/dashboard/components/QuickActionsPanel'

const HomeView = () => {
  return (
    <main>
      <PageHeader title="Home" className="lg:hidden" />
      <div className="space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <QueryTextInput />
        <QuickActionsPanel />
      </div>
    </main>
  )
}

export default HomeView
