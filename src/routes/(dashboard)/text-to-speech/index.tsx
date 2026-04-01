import TextToSpeechView from '@/features/text-to-speech/views/TextToSpeechView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/text-to-speech/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TextToSpeechView />
}
