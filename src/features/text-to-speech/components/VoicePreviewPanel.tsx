import { Button } from '@/components/ui/button'
import VoiceAvatar from '@/features/voices/components/VoiceAvatar'
import { Download, Pause, Play, Redo, Undo } from 'lucide-react'
import { useState } from 'react'
import { useWavesurfer } from '@/features/text-to-speech/hooks/use-wavesurfer'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type VoicePreviewPanelVoice = Readonly<{
  id?: string
  name: string
}>

type Props = Readonly<{
  audioUrl: string
  voice: VoicePreviewPanelVoice | null
  query: string
}>

const formatTime = (seconds: number) => {
  const total = Math.max(0, Math.floor(seconds))
  const mm = String(Math.floor(total / 60)).padStart(2, '0')
  const ss = String(total % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

const VoicePreviewPanel = ({ audioUrl, voice, query }: Props) => {
  const selectedVoiceName = voice?.name ?? null
  const selectedVoiceSeed = voice?.id ?? null
  const [isDownloading, setIsDownloading] = useState(false)
  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    toggleState,
    seekForward,
    seekBackward,
  } = useWavesurfer({
    url: audioUrl,
    autoplay: true,
  })

  const handleDownload = () => {
    setIsDownloading(true)
    const safeName =
      query
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-+$/g, '')
        .toLowerCase() || 'speech'

    const link = document.createElement('a')
    link.href = audioUrl
    link.download = `${safeName}.wav`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setIsDownloading(false), 1000)
  }

  return (
    <div className="h-full gap-8 flex-col border-t hidden flex-1 lg:flex">
      <div className="p-6 pb-0">
        <h3 className="font-semibold text-foreground">Voice Preview</h3>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        {!isReady && <Spinner />}
        <div
          ref={containerRef}
          className={cn(
            'w-full cursor-pointer transition-opacity duration-200',
            !isReady && 'opacity-0',
          )}
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
          {formatTime(currentTime)}&nbsp;
          <span className="text-muted-foreground">
            /&nbsp;{formatTime(duration)}
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center p-6">
        <div className="grid w-full grid-cols-3">
          <div className="flex min-w-0 flex-col gap-1 5">
            <p className="truncate text-sm font-bold text-foreground">
              {query}
            </p>
            {selectedVoiceName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <VoiceAvatar
                  seed={selectedVoiceSeed ?? selectedVoiceName}
                  name={selectedVoiceName}
                  className="shrink-0"
                />
                <span className="truncate">{selectedVoiceName}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon-lg"
              className="flex-col"
              onClick={() => seekBackward(10)}
              disabled={!isReady}
            >
              <Undo className="size-4 -mb-1" />
              <span className="text-[10px] font-medium">10</span>
            </Button>
            <Button
              size="icon-lg"
              className="rounded-full"
              onClick={toggleState}
            >
              {isPlaying ? (
                <Pause className="fill-foreground" />
              ) : (
                <Play className="fill-foreground" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              className="flex-col"
              onClick={() => seekForward(10)}
              disabled={!isReady}
            >
              <Redo className="size-4 -mb-1" />
              <span className="text-[10px] font-medium">10</span>
            </Button>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="size-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoicePreviewPanel
