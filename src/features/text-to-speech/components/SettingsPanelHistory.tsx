import { AudioLines, AudioWaveform, Clock } from 'lucide-react'
import type { getAllGenerationsByOrganizationId } from '@/features/text-to-speech/functions/getAllGenerationsByOrganizationId'
import { Link } from '@tanstack/react-router'
import VoiceAvatar from '@/features/voices/components/VoiceAvatar'
import { formatDistanceToNow } from 'date-fns'

type Generation = Awaited<
  ReturnType<typeof getAllGenerationsByOrganizationId>
>[number]

type Props = Readonly<{
  generations: Array<Generation>
}>

const SettingsPanelHistory = ({ generations }: Props) => {
  if (!generations.length || generations.length <= 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <div className="relative flex w-25 items-center justify-center">
          <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-3">
            <AudioLines className="size-4 text-muted-foreground" />
          </div>

          <div className="relative z-10 rounded-full bg-foreground p-3">
            <AudioWaveform className="size-4 text-background" />
          </div>

          <div className="absolute right-0 rotate-30 rounded-full bg-muted p-3">
            <Clock className="size-4 text-muted-foreground" />
          </div>
        </div>
        <p className="font-semibold tracking-tight text-foreground mt-5 font-lora">
          No generations yet
        </p>
        <p className="max-w-48 text-center text-xs text-muted-foreground mt-2">
          Your recent generations will appear here.
        </p>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-1 p-2">
        {generations.map((generation) => (
          <Link
            key={generation.id}
            to="/text-to-speech/$generationId"
            params={{ generationId: generation.id }}
            className="flex items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1 5">
              <p className="truncate text-sm font-bold text-foreground">
                {generation.prompt}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <VoiceAvatar
                  seed={generation.voiceId ?? generation.voiceName}
                  name={generation.voiceName}
                  className="shrink-0"
                />
                <span className="text-foreground">{generation.voiceName}</span>
                <span>&middot;</span>
                <span>
                  {formatDistanceToNow(generation.createdAt, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

export default SettingsPanelHistory
