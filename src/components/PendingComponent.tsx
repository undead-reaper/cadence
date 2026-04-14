import { Loader2 } from 'lucide-react'

const PendingComponent = () => {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <Loader2 className="animate-spin" />
    </main>
  )
}

export default PendingComponent
