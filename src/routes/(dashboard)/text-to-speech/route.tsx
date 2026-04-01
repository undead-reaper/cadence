import TextToSpeechLayout from '@/features/text-to-speech/layouts/TextToSpeechLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/text-to-speech')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TextToSpeechLayout />
}
