import UpgradeCard from '@/features/billing/components/UpgradeCard'
import UsageCard from '@/features/billing/components/UsageCard'
import { getSubscriptionStatus } from '@/features/billing/functions/getSubscriptionStatus'
import { useOrganization } from '@clerk/tanstack-react-start'
import { useQuery } from '@tanstack/react-query'

const UsageContainer = () => {
  const { organization } = useOrganization()

  const { data, isPending } = useQuery({
    queryKey: ['billing', 'subscription-status', organization?.id],
    queryFn: () => getSubscriptionStatus(),
  })

  if (isPending || !data) {
    return (
      <div className="group-data-[collapsible=icon]:hidden h-30 bg-muted rounded-lg p-3 animate-pulse" />
    )
  }

  return (
    <div className="group-data-[collapsible=icon]:hidden bg-background border border-border rounded-lg p-3">
      {data.hasActiveSubscription ? (
        <UsageCard estimatedUsageCents={data.estimatedCostCents} />
      ) : (
        <UpgradeCard />
      )}
    </div>
  )
}

export default UsageContainer
