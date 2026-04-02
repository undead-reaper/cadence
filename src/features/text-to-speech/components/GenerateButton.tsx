import { Button } from '@/components/ui/button'
import { LoadingSwap } from '@/components/ui/loading-swap'

type Props = Readonly<{
  size?: 'default' | 'sm'
  disabled: boolean
  isSubmitting: boolean
  onSubmit: () => void
  className?: string
}>

const GenerateButton = ({
  disabled,
  isSubmitting,
  onSubmit,
  className,
  size = 'default',
}: Props) => {
  return (
    <Button
      type="submit"
      className={className}
      size={size}
      disabled={disabled}
      onClick={onSubmit}
    >
      <LoadingSwap isLoading={isSubmitting}>Generate</LoadingSwap>
    </Button>
  )
}

export default GenerateButton
