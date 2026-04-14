import { getRouteApi } from '@tanstack/react-router'
import VoicesList from '@/features/voices/components/VoicesList'
import VoicesToolbar from '@/features/voices/components/VoicesToolbar'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useOrganization } from '@clerk/tanstack-react-start'
import { getAllVoicesQuery } from '@/features/voices/queries/getAllVoicesQuery'

const VoicesView = () => {
  const routeApi = getRouteApi('/(dashboard)/voices/')
  const { orgId } = routeApi.useRouteContext()
  const { query } = routeApi.useSearch()
  const { organization } = useOrganization()
  const resolvedOrgId = organization?.id ?? orgId
  const {
    data: { custom: customVoices, system: systemVoices },
  } = useSuspenseQuery(getAllVoicesQuery({ orgId: resolvedOrgId, query }))

  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoicesToolbar />
      <VoicesList title="Team Voices" voices={customVoices} />
      <VoicesList title="System Voices" voices={systemVoices} />
    </div>
  )
}

export default VoicesView
