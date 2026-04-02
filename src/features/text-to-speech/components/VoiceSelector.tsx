import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ttsFormOptions } from '@/features/text-to-speech/components/TextToSpeechForm'
import { useTTSVoices } from '@/features/text-to-speech/contexts/tts-voices-context'
import VoiceAvatar from '@/features/voices/components/VoiceAvatar'
import { useTypedAppFormContext } from '@/hooks/use-app-form'
import { useStore } from '@tanstack/react-form'

const VoiceSelector = () => {
  const { allVoices, customVoices, systemVoices } = useTTSVoices()
  const form = useTypedAppFormContext(ttsFormOptions)
  const voiceId = useStore(form.store, (s) => s.values.voiceId)
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)
  const selectedVoice = allVoices.find((voice) => voice.id === voiceId)
  const hasMissingSelectedVoice = Boolean(voiceId) && !selectedVoice
  const currentVoice = selectedVoice
    ? selectedVoice
    : hasMissingSelectedVoice
      ? {
          id: voiceId,
          name: 'Unknown Voice',
          category: null,
        }
      : allVoices[0]

  return (
    <Field>
      <FieldLabel>Voice Style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(e) => form.setFieldValue('voiceId', e)}
        disabled={isSubmitting}
      >
        <SelectTrigger>
          <SelectValue>
            <VoiceAvatar name={currentVoice.name} seed={currentVoice.id} />
            <span className="truncate text-sm font-medium tracking-tight">
              {currentVoice.name}
              {currentVoice.category && ` - ${currentVoice.category}`}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hasMissingSelectedVoice && (
            <>
              <SelectGroup>
                <SelectLabel>Selected Voice</SelectLabel>
                <SelectItem value={currentVoice.id}>
                  <VoiceAvatar
                    name={currentVoice.name}
                    seed={currentVoice.id}
                  />
                  <span className="truncate text-sm font-medium tracking-tight whitespace-nowrap">
                    {currentVoice.name}
                    {currentVoice.category && ` - ${currentVoice.category}`}
                  </span>
                </SelectItem>
              </SelectGroup>
              {(customVoices.length > 0 || systemVoices.length > 0) && (
                <SelectSeparator />
              )}
            </>
          )}
          {customVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Organization Voices</SelectLabel>
              {customVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <VoiceAvatar name={voice.name} seed={voice.id} />
                  <span className="truncate text-sm font-medium tracking-tight whitespace-nowrap">
                    {voice.name} - {voice.category}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
          {customVoices.length > 0 && systemVoices.length > 0 && (
            <SelectSeparator />
          )}
          {systemVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>System Voices</SelectLabel>
              {systemVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <VoiceAvatar name={voice.name} seed={voice.id} />
                  <span className="truncate text-sm font-medium tracking-tight whitespace-nowrap">
                    {voice.name} - {voice.category}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </Field>
  )
}

export default VoiceSelector
