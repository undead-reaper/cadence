import { useTTSVoices } from '@/features/text-to-speech/contexts/tts-voices-context'
import { useTypedAppFormContext } from '@/hooks/use-app-form'
import { ttsFormOptions } from '@/features/text-to-speech/components/TextToSpeechForm'
import { useStore } from '@tanstack/react-form'
import { DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import VoiceAvatar from '@/features/voices/components/VoiceAvatar'
import { ChevronDown } from 'lucide-react'

const VoiceSelectorButton = () => {
  const { allVoices } = useTTSVoices()
  const form = useTypedAppFormContext(ttsFormOptions)
  const voiceId = useStore(form.store, (s) => s.values.voiceId)
  const currentVoice = allVoices.find((v) => v.id === voiceId) ?? allVoices[0]

  const buttonLabel = currentVoice.name

  return (
    <DrawerTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 justify-start gap-2 px-2"
      >
        <VoiceAvatar
          seed={currentVoice.id}
          name={currentVoice.name}
          className="size-6"
        />
        <span className="flex-1 truncate text-left text-sm font-bold">
          {buttonLabel}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </Button>
    </DrawerTrigger>
  )
}

export default VoiceSelectorButton
