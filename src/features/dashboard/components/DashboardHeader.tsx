import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/tanstack-react-start'
import { LifeBuoy, ThumbsUp } from 'lucide-react'

const DashboardHeader = () => {
  const { isLoaded, user } = useUser()
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Nice to meet you</p>
        {isLoaded ? (
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight font-lora">
            {user?.fullName}
          </h1>
        ) : (
          <Skeleton className="w-48 h-8 bg-muted animate-pulse" />
        )}
      </div>
      <div className="items-center gap-3 hidden lg:flex">
        <Button variant="secondary" size="sm" asChild>
          <a href="mailto:dharamsoni1010@gmail.com">
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </a>
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <a href="mailto:dharamsoni1010@gmail.com">
            <LifeBuoy />
            <span className="hidden lg:block">Need Help?</span>
          </a>
        </Button>
      </div>
    </div>
  )
}

export default DashboardHeader
