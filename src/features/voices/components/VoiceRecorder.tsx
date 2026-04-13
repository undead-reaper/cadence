import { useAudioPlayback } from '@/hooks/use-audio-playback'
import { useVoiceRecorder } from '@/features/voices/hooks/use-voice-recorder'
import { Button } from '@/components/ui/button'
import { cn, formatFileSize } from '@/lib/utils'
import { FileAudio, Mic, Pause, Play, RotateCcw, Square, X } from 'lucide-react'

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

type Props = Readonly<{
  file: File | null
  onFileChange: (file: File | null) => void
  isInvalid?: boolean
}>

const VoiceRecorder = ({ file, onFileChange, isInvalid }: Props) => {
  const { isPlaying, togglePlay } = useAudioPlayback(file)
  const {
    audioBlob,
    containerRef,
    elapsedTime,
    error,
    isRecording,
    resetRecorder,
    startRecording,
    stopRecording,
  } = useVoiceRecorder()

  const handleStop = () => {
    stopRecording((blob) => {
      const recordedFile = new File([blob], `recording-${Date.now()}.wav`, {
        type: 'audio/wav',
      })
      onFileChange(recordedFile)
    })
  }

  const handleReset = () => {
    resetRecorder()
    onFileChange(null)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/50 bg-destructive/5 px-6 py-10">
        <p className="text-center text-sm text-destructive">{error}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetRecorder}
        >
          Try again
        </Button>
      </div>
    )
  } else if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          <FileAudio className="size-5 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
            {audioBlob && elapsedTime > 0 && (
              <>&nbsp;&middot;&nbsp;{formatDuration(elapsedTime)}</>
            )}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleReset}
          title="Reset"
        >
          <RotateCcw className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleReset}
          title="Remove"
        >
          <X className="size-4" />
        </Button>
      </div>
    )
  } else if (isRecording) {
    return (
      <div className="flex flex-col overflow-hidden rounded-2xl border">
        <div ref={containerRef} className="w-full" />
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-[28px] font-semibold leading-[1.2] tracking-tight">
            {formatDuration(elapsedTime)}
          </p>
          <Button variant="destructive" type="button" onClick={handleStop}>
            <Square className="size-3" />
            <span>Stop</span>
          </Button>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border px-6 py-10',
          isInvalid && 'border-destructive',
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
          <Mic className="size-5 text-muted-foreground" />
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-base font-semibold tracking-tight">
            Record your voice
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Click record to start capturing audio
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={startRecording}
        >
          <Mic className="size-3.5" />
          Record
        </Button>
      </div>
    )
  }
}

export default VoiceRecorder
