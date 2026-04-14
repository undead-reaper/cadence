import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { createCheckout } from '@/features/billing/functions/createCheckout'
import { toast } from 'sonner'
import { LoadingSwap } from '@/components/ui/loading-swap'

const UpgradeCard = () => {
  const [isCheckoutPending, startCheckout] = useTransition()

  const handleCheckout = async () => {
    try {
      startCheckout(async () => {
        const { checkoutUrl } = await createCheckout()
        window.location.href = checkoutUrl
      })
    } catch (error) {
      toast.error('Failed to create checkout session', {
        description:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      })
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold tracking-tight text-foreground">
          Pay as you go
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Generate speech starting from $0.30 per 1,000 characters.
        </p>
      </div>
      <Button
        variant="outline"
        className="w-full text-xs"
        size="sm"
        disabled={isCheckoutPending}
        onClick={handleCheckout}
      >
        <LoadingSwap isLoading={isCheckoutPending}>Upgrade</LoadingSwap>
      </Button>
    </div>
  )
}

export default UpgradeCard
