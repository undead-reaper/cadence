import { Button } from '@/components/ui/button'
import VoiceAvatar from '@/features/voices/components/VoiceAvatar'
import { useIsMobile } from '@/hooks/use-mobile'
import { Download, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type VoicePreviewMobileVoice = Readonly<{
  id?: string
  name: string
}>

type Props = Readonly<{
  audioUrl: string
  voice: VoicePreviewMobileVoice | null
  query: string
}>

const VoicePreviewMobile = ({ audioUrl, voice, query }: Props) => {
  const isMobile = useIsMobile()
  const selectedVoiceName = voice?.name ?? null
  const selectedVoiceSeed = voice?.id ?? null
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    audio.pause()
    audio.currentTime = 0
    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  const handleDownload = () => {
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
  }

  useEffect(() => {
    if (!isMobile) {
      audioRef.current?.pause()
    }
  }, [isMobile])

  const toggleMediaState = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }

  return (
    <div className="border-t p-4 lg:hidden">
      <audio ref={audioRef} src={audioUrl} autoPlay={false} />
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="min-w-0 flex-col gap-1 flex">
          <p className="truncate text-sm font-bold">{query}</p>
          {selectedVoiceName && (
            <div className="mt-0 5 flex items-center gap-2 text-xs text-muted-foreground">
              <VoiceAvatar
                seed={selectedVoiceSeed ?? selectedVoiceName}
                className="shrink-0"
                name={selectedVoiceName}
              />
              <span className="truncate">{selectedVoiceName}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="size-4" />
          </Button>
          <Button
            size="icon"
            className="rounded-full"
            onClick={toggleMediaState}
          >
            {isPlaying ? (
              <Pause className="fill-foreground" />
            ) : (
              <Play className="fill-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VoicePreviewMobile
