import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { LifeBuoy, ThumbsUp } from 'lucide-react'

type Props = Readonly<{
  title: string
  className?: string
}>

const PageHeader = ({ title, className }: Props) => {
  return (
    <div className={cn('flex items-center justify-between p-4', className)}>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
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

export default PageHeader
