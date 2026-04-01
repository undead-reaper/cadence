import QueryInputPanel from '@/features/text-to-speech/components/QueryInputPanel'
import SettingsPanel from '@/features/text-to-speech/components/SettingsPanel'
import TextToSpeechForm, {
  defaultTTSValues,
} from '@/features/text-to-speech/components/TextToSpeechForm'
import VoicePreviewPlaceholder from '@/features/text-to-speech/components/VoicePreviewPlaceholder'

const TextToSpeechView = () => {
  return (
    <TextToSpeechForm defaultValues={defaultTTSValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <QueryInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  )
}

export default TextToSpeechView
