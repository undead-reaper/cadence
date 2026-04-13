import { Button } from '@/components/ui/button'
import { useAudioPlayback } from '@/hooks/use-audio-playback'
import { cn, formatFileSize } from '@/lib/utils'
import { AudioLines, FileAudio, FolderOpen, Pause, Play, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

type Props = Readonly<{
  file: File | null
  onFileChange: (file: File | null) => void
  isInvalid?: boolean
}>

const FileDropzone = ({ file, onFileChange, isInvalid }: Props) => {
  const { isPlaying, togglePlay } = useAudioPlayback(file)
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { 'audio/*': [] },
      maxSize: 20 * 1024 * 1024,
      multiple: false,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onFileChange(acceptedFiles[0])
        }
      },
    })

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          <FileAudio className="size-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={togglePlay}
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
          onClick={() => onFileChange(null)}
        >
          <X className="size-4" />
        </Button>
      </div>
    )
  } else {
    return (
      <div
        {...getRootProps()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border px-6 py-10 transition-colors',
          isDragReject || isInvalid
            ? 'border-destructive'
            : isDragActive
              ? 'border-primary'
              : 'border-muted',
        )}
      >
        <input {...getInputProps()} />
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
          <AudioLines className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-base font-semibold tracking-tight">
            Upload Audio File
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Supports all audio formats. Max file size: 20MB.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm">
          <FolderOpen className="size-4" />
          <span>Choose File</span>
        </Button>
      </div>
    )
  }
}

export default FileDropzone
