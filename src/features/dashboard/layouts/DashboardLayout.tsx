import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar'
import { Outlet } from '@tanstack/react-router'

const DashboardLayout = () => {
  return (
    <SidebarProvider className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main className="flex flex-1 min-h-0 flex-col">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
