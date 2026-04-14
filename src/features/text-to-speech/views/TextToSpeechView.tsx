import QueryInputPanel from '@/features/text-to-speech/components/QueryInputPanel'
import SettingsPanel from '@/features/text-to-speech/components/SettingsPanel'
import TextToSpeechForm, {
  defaultTTSValues,
} from '@/features/text-to-speech/components/TextToSpeechForm'
import VoicePreviewPlaceholder from '@/features/text-to-speech/components/VoicePreviewPlaceholder'
import { TTSVoicesProvider } from '@/features/text-to-speech/contexts/tts-voices-context'
import type { TTSFormData } from '@/features/text-to-speech/types/ttsFormSchema'
import { useOrganization } from '@clerk/tanstack-react-start'
import { getRouteApi } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getAllVoicesAndGenerationsQuery } from '@/features/text-to-speech/queries/getAllVoicesAndGenerationsQuery'

const TextToSpeechView = () => {
  const routeApi = getRouteApi('/(dashboard)/text-to-speech/')
  const { orgId } = routeApi.useRouteContext()
  const initialValues = routeApi.useSearch()
  const { voiceId } = initialValues
  const { organization } = useOrganization()
  const resolvedOrgId = organization?.id ?? orgId
  const {
    data: { customVoices, systemVoices, generations },
  } = useSuspenseQuery(
    getAllVoicesAndGenerationsQuery({ orgId: resolvedOrgId }),
  )

  const allVoices = [...customVoices, ...systemVoices]
  const fallbackVoiceId = allVoices[0]?.id ?? ''
  const resolvedVoiceId =
    voiceId && allVoices.some((v) => v.id === voiceId)
      ? voiceId
      : fallbackVoiceId

  const defaultValues: TTSFormData = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  }

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <QueryInputPanel generations={generations} />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel generations={generations} />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  )
}

export default TextToSpeechView
