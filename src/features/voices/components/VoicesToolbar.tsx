import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { getRouteApi } from '@tanstack/react-router'
import { Plus, Search } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useDebouncedValue } from '@tanstack/react-pacer'
import CreateVoiceDialog from '@/features/voices/components/CreateVoiceDialog'
import { useHotkey } from '@tanstack/react-hotkeys'
import { Kbd } from '@/components/ui/kbd'

const VoicesToolbar = () => {
  const routeApi = getRouteApi('/(dashboard)/voices/')
  const { query } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const [localQuery, setLocalQuery] = useState(query ?? '')
  const searchRef = useRef<HTMLInputElement>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  useHotkey(
    'Mod+K',
    () => {
      if (searchRef.current) {
        searchRef.current.focus()
      }
    },
    {
      preventDefault: true,
      requireReset: true,
      enabled: Boolean(searchRef.current),
    },
  )

  useDebouncedValue(
    () => {
      if (localQuery === '') {
        navigate({ search: {} })
      } else if (localQuery !== query) {
        navigate({ search: { query: localQuery } })
      }
    },
    {
      wait: 300,
    },
  )

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold tracking-tight font-lora">
          All Libraries
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover our voices, or add new ones to your library.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <InputGroup className="lg:max-w-sm">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              ref={searchRef}
              placeholder="Search Voices"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value)
              }}
            />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <div className="ml-auto hidden lg:block">
            <Button onClick={() => setShowCreateDialog(true)} size="sm">
              <Plus />
              Add Voice
            </Button>
          </div>
          <div className="lg:hidden">
            <Button
              size="sm"
              className="w-full"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus />
              Add Voice
            </Button>
          </div>
          <CreateVoiceDialog
            open={showCreateDialog}
            onOpenChange={setShowCreateDialog}
          />
        </div>
      </div>
    </div>
  )
}

export default VoicesToolbar
