import { Button } from '@/components/ui/button'
import { AudioLines, BookOpen, Sparkles, Volume2 } from 'lucide-react'

const VoicePreviewPlaceholder = () => {
  return (
    <div className="hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-4 border-t">
      <div className="flex flex-col items-center gap-2">
        <div className="relative flex w-32 items-center justify-center">
          <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-4">
            <Volume2 className="size-5 text-muted-foreground" />
          </div>
          <div className="absolute z-10 rounded-full bg-foreground p-4">
            <Sparkles className="size-5 text-background" />
          </div>
          <div className="absolute right-0 -rotate-30 rounded-full bg-muted p-4">
            <AudioLines className="size-5 text-muted-foreground" />
          </div>
        </div>
        <p className="text-lg font-semibold tracking-tight text-foreground mt-10 font-lora">
          Preview will appear here.
        </p>
        <p className="max-w-64 text-center text-sm text-muted-foreground">
          After you generate the voice, you can listen to and download the
          preview.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <a href="mailto:dharamsoni1010@gmail.com">
          <BookOpen />
          <span>Don't know how?</span>
        </a>
      </Button>
    </div>
  )
}

export default VoicePreviewPlaceholder
