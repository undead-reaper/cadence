import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { getAllGenerationsByOrganizationId } from '@/features/text-to-speech/functions/getAllGenerationsByOrganizationId'
import { History } from 'lucide-react'
import SettingsPanelHistory from '@/features/text-to-speech/components/SettingsPanelHistory'

type Generation = Awaited<
  ReturnType<typeof getAllGenerationsByOrganizationId>
>[number]

type Props = Readonly<{
  generations: Array<Generation>
}>

const HistoryDrawer = ({ generations }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-lora">History</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <SettingsPanelHistory generations={generations} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default HistoryDrawer
