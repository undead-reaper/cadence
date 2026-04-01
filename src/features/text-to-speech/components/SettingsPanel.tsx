import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SettingsPanelHistory from '@/features/text-to-speech/components/SettingsPanelHistory'
import SettingsPanelOptions from '@/features/text-to-speech/components/SettingsPanelOptions'
import { History, Settings } from 'lucide-react'

const tabTriggerClassName =
  'flex-1 h-full gap-2 bg-transparent rounded-none border-x-0 border-t-0 border-b-px border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none'

const SettingsPanel = () => {
  return (
    <div className="hidden w-105 min-h-0 flex-col border-l lg:flex">
      <Tabs
        defaultValue="options"
        className="flex h-full min-h-0 flex-col gap-y-0"
      >
        <TabsList className="w-full bg-transparent rounded-none border-b h-12! group-data-[orientation=horizontal]/tab:h-12! p-0">
          <TabsTrigger value="options" className={tabTriggerClassName}>
            <Settings className="size-4" />
            <span>Options</span>
          </TabsTrigger>
          <TabsTrigger value="history" className={tabTriggerClassName}>
            <History className="size-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="options"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelOptions />
        </TabsContent>
        <TabsContent
          value="history"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPanel
