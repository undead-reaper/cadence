import PageHeader from '@/components/PageHeader'
import { Outlet } from '@tanstack/react-router'

const TextToSpeechLayout = () => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Text to Speech" />
      <Outlet />
    </div>
  )
}

export default TextToSpeechLayout
