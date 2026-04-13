import PageHeader from '@/components/PageHeader'
import { Outlet } from '@tanstack/react-router'

const VoicesLayout = () => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Voices" />
      <Outlet />
    </div>
  )
}

export default VoicesLayout
