import { getRouteApi } from '@tanstack/react-router'
import QueryInputPanel from '@/features/text-to-speech/components/QueryInputPanel'
import SettingsPanel from '@/features/text-to-speech/components/SettingsPanel'
import TextToSpeechForm from '@/features/text-to-speech/components/TextToSpeechForm'
import { TTSVoicesProvider } from '@/features/text-to-speech/contexts/tts-voices-context'
import type { TTSFormData } from '@/features/text-to-speech/types/ttsFormSchema'
import VoicePreviewPanel from '@/features/text-to-speech/components/VoicePreviewPanel'
import VoicePreviewMobile from '@/features/text-to-speech/components/VoicePreviewMobile'

const TextToSpeechDetailsView = () => {
  const routeApi = getRouteApi('/(dashboard)/text-to-speech/$generationId')
  const { context } = routeApi.useLoaderData()
  const { generationId } = routeApi.useParams()
  const {
    custom: customVoices,
    system: systemVoices,
    generation,
    generations,
  } = context
  const allVoices = [...customVoices, ...systemVoices]
  const fallbackVoiceId = allVoices[0]?.id ?? ''
  const resolvedVoiceId =
    generation.voiceId && allVoices.some((v) => v.id === generation.voiceId)
      ? generation.voiceId
      : fallbackVoiceId

  const defaultValues: TTSFormData = {
    query: generation.prompt,
    voiceId: resolvedVoiceId,
    temperature: generation.temperature,
    topP: generation.topP,
    topK: generation.topK,
    repetitionPenalty: generation.repetitionPenalty,
  }

  const generationVoice = {
    id: generation.voiceId ?? undefined,
    name: generation.voiceName,
  }

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <QueryInputPanel generations={generations} />
            <VoicePreviewPanel
              audioUrl={generation.audioUrl}
              voice={generationVoice}
              query={generation.prompt}
            />
            <VoicePreviewMobile
              audioUrl={generation.audioUrl}
              voice={generationVoice}
              query={generation.prompt}
            />
          </div>
          <SettingsPanel generations={generations} />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  )
}

export default TextToSpeechDetailsView
