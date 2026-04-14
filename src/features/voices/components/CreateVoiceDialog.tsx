import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import CreateVoiceForm from '@/features/voices/components/CreateVoiceForm'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createCheckout } from '@/features/billing/functions/createCheckout'

type Props = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>

const CreateVoiceDialog = ({ open, onOpenChange }: Props) => {
  const isMobile = useIsMobile()

  const handleError = (message: string) => {
    if (
      message.includes(
        'An active subscription is required to perform this action.',
      )
    ) {
      toast.error(message, {
        action: {
          label: 'Subscribe',
          onClick: async () => {
            const url = await createCheckout()
            window.location.href = url.checkoutUrl
          },
        },
      })
    } else {
      toast.error(message)
    }
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Custom Voice</DrawerTitle>
            <DrawerDescription>
              Upload or record an audio sample to add a new voice to your
              library.
            </DrawerDescription>
          </DrawerHeader>
          <CreateVoiceForm
            onSubmit={() => onOpenChange(false)}
            scrollable
            onError={handleError}
            footer={(submit) => (
              <DrawerFooter>
                {submit}
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            )}
          />
        </DrawerContent>
      </Drawer>
    )
  } else {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Add Custom Voice</DialogTitle>
            <DialogDescription>
              Upload or record an audio sample to add a new voice to your
              library.
            </DialogDescription>
          </DialogHeader>
          <CreateVoiceForm
            onError={handleError}
            onSubmit={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export default CreateVoiceDialog
