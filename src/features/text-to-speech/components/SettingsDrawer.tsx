import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Settings } from 'lucide-react'
import type { ReactNode } from 'react'
import SettingsPanelOptions from '@/features/text-to-speech/components/SettingsPanelOptions'

type Props = Readonly<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}>

const SettingsDrawer = ({ children, onOpenChange, open }: Props) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children ?? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="size-4" />
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <SettingsPanelOptions />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default SettingsDrawer
