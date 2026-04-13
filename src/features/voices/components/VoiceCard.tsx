import type { getAllVoices } from '@/features/voices/functions/getAllVoices'
import { parseLocale } from '@/lib/utils'
import VoiceAvatar from '@/features/voices/components/VoiceAvatar'
import { Button } from '@/components/ui/button'
import { Mic, MoreHorizontal, Pause, Play, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAudioPlayback } from '@/hooks/use-audio-playback'
import { Spinner } from '@/components/ui/spinner'
import { useState, useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { deleteVoiceById } from '../functions/deleteVoiceById'
import { toast } from 'sonner'
import { LoadingSwap } from '@/components/ui/loading-swap'

type Voice = Awaited<ReturnType<typeof getAllVoices>>['custom'][number]

type Props = {
  voice: Voice
}

const VoiceCard = ({ voice }: Props) => {
  const { flag, region } = parseLocale({ locale: voice.language })
  const { isLoading, isPlaying, togglePlay } = useAudioPlayback(
    `/api/voices/${encodeURIComponent(voice.id)}`,
  )
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, startDeleting] = useTransition()
  const navigate = useNavigate()

  const handleDelete = ({ voiceId }: { voiceId: string }) => {
    try {
      startDeleting(() => {
        deleteVoiceById({ data: { voiceId } })
        toast.success('Voice deleted successfully.', {
          description: 'All associated audio files deleted.',
        })
      })
      navigate({ to: '.' })
    } catch (err) {
      toast.error('Could not delete voice.', {
        description: err instanceof Error ? err.message : String(err),
      })
    } finally {
      setShowDeleteDialog(false)
    }
  }

  return (
    <div className="flex items-center gap-1 overflow-hidden rounded-xl border pr-3 lg:pr-6">
      <div className="relative h-24 w-20 shrink-0 lg:h-30 lg:w-24">
        <div className="absolute left-0 top-0 h-24 w-10 border-r bg-muted/50 lg:h-30 lg:w-12" />
        <div className="absolute inset-0 flex items-center justify-center">
          <VoiceAvatar
            seed={voice.id}
            name={voice.name}
            className="size-14 border-[1.5px] border-background shadow-xs lg:size-18"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:gap-3">
        <div className="flex flex-col items-start line-clamp-1 text-sm font-bold tracking-tight font-lora">
          {voice.name}
          <span className="text-primary text-xs">{voice.category}</span>
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {voice.description}
        </p>
        <p className="flex items-center gap-1 text-xs">
          <span className="shrink-0">{flag}</span>
          <span className="truncate font-medium">{region}</span>
        </p>
      </div>
      <div className="ml-1 flex shrink-0 items-center gap-1 lg:ml-3 lg:gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={togglePlay}
          disabled={false}
        >
          {isLoading ? (
            <Spinner className="size-4" />
          ) : isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-sm" className="rounded-full">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/text-to-speech" search={{ voiceId: voice.id }}>
                <Mic className="size-4 text-foreground" />
                <span className="font-medium">Use Voice</span>
              </Link>
            </DropdownMenuItem>
            {voice.variant === 'Custom' && (
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
              >
                <Trash2 className="size-4 text-destructive" />
                <span className="font-medium">Delete</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {voice.variant === 'Custom' && (
          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Voice</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{voice.name}&quot;? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  <LoadingSwap isLoading={isDeleting}>Cancel</LoadingSwap>
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete({ voiceId: voice.id })
                  }}
                >
                  <LoadingSwap isLoading={isDeleting}>Delete</LoadingSwap>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}

export default VoiceCard
