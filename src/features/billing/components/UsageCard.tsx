import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { createPortalSession } from '@/features/billing/functions/createPortalSession'
import { toast } from 'sonner'
import { LoadingSwap } from '@/components/ui/loading-swap'

const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

type Props = Readonly<{
  estimatedUsageCents: number
}>

const UsageCard = ({ estimatedUsageCents }: Props) => {
  const [isPortalOpening, startTransition] = useTransition()

  const handleOpenPortal = () => {
    startTransition(async () => {
      try {
        const { portalUrl } = await createPortalSession()
        window.open(portalUrl, '_blank')
      } catch (error) {
        toast.error('Failed to open billing portal', {
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.',
        })
      }
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold tracking-tight text-foreground">
          Current Usage
        </p>
        <p className="text-xl font-bold tracking-tight text-foreground">
          {formatCurrency(estimatedUsageCents)}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Estimated this period
        </p>
      </div>
      <Button
        variant="outline"
        className="w-full text-xs"
        size="sm"
        disabled={isPortalOpening}
        onClick={handleOpenPortal}
      >
        <LoadingSwap isLoading={isPortalOpening}>
          Manage Subscription
        </LoadingSwap>
      </Button>
    </div>
  )
}

export default UsageCard
