import QueryInputPanel from '@/features/text-to-speech/components/QueryInputPanel'
import SettingsPanel from '@/features/text-to-speech/components/SettingsPanel'
import TextToSpeechForm, {
  defaultTTSValues,
} from '@/features/text-to-speech/components/TextToSpeechForm'
import VoicePreviewPlaceholder from '@/features/text-to-speech/components/VoicePreviewPlaceholder'
import { TTSVoicesProvider } from '@/features/text-to-speech/contexts/tts-voices-context'
import type { TTSFormData } from '@/features/text-to-speech/types/ttsFormSchema'
import { getRouteApi } from '@tanstack/react-router'

const TextToSpeechView = () => {
  const routeApi = getRouteApi('/(dashboard)/text-to-speech/')
  const { context } = routeApi.useLoaderData()
  const initialValues = routeApi.useSearch()
  const { voiceId } = initialValues
  const { custom: customVoices, system: systemVoices, generations } = context
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
