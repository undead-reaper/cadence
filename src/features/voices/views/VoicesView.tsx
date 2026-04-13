import { getRouteApi } from '@tanstack/react-router'
import VoicesList from '@/features/voices/components/VoicesList'
import VoicesToolbar from '@/features/voices/components/VoicesToolbar'

const VoicesView = () => {
  const routeApi = getRouteApi('/(dashboard)/voices/')
  const { context } = routeApi.useRouteContext()
  const {
    voices: { custom: customVoices, system: systemVoices },
  } = context

  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoicesToolbar />
      <VoicesList title="Team Voices" voices={customVoices} />
      <VoicesList title="System Voices" voices={systemVoices} />
    </div>
  )
}

export default VoicesView
