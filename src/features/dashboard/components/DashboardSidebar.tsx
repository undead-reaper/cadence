import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import NavSection from '@/features/dashboard/components/NavSection'
import type { MenuItem } from '@/features/dashboard/types/MenuItem'
import {
  OrganizationSwitcher,
  useClerk,
  UserButton,
} from '@clerk/tanstack-react-start'
import { useLocation } from '@tanstack/react-router'
import {
  AudioLines,
  Blocks,
  Home,
  LifeBuoy,
  MicVocal,
  Settings
} from 'lucide-react'

const DashboardSidebar = () => {
  const clerk = useClerk()
  const { pathname } = useLocation()

  const mainMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      label: 'Explore Voices',
      url: '/voices',
      icon: Blocks,
    },
    {
      label: 'Text to Speech',
      url: '/text-to-speech',
      icon: AudioLines,
    },
    {
      label: 'Voice Cloning',
      icon: MicVocal,
    },
  ]

  const othersMenuItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      label: 'Help & Support',
      icon: LifeBuoy,
      url: 'mailto:dharamsoni1010@gmail.com',
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 top-4">
        <div className="flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
          <img
            src="/logo.svg"
            alt="Cadence"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground">
            Cadence
          </span>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="h-10 w-full group-data-[collapsible=icon]:size-8 rounded-md bg-muted animate-pulse" />
              }
              appearance={{
                elements: {
                  rootBox:
                    'w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!',
                  organizationSwitcherTrigger:
                    'w-full! justify-between! bg-muted! rounded-md! pl-2! pr-3! py-2! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1!',
                  organizationPreview: 'gap-2!',
                  organizationPreviewAvatarBox: 'size-6! rounded-sm!',
                  organizationPreviewTextContainer:
                    'text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!',
                  organizationPreviewMainIdentifier: 'text-[13px]!',
                  organizationSwitcherTriggerIcon:
                    'size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!',
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSection items={mainMenuItems} pathname={pathname} />
        <NavSection
          label="Others"
          items={othersMenuItems}
          pathname={pathname}
        />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              fallback={
                <Skeleton className="h-10 w-full group-data-[collapsible=icon]:size-8 rounded-md bg-muted animate-pulse" />
              }
              appearance={{
                elements: {
                  rootBox:
                    'w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!',
                  userButtonTrigger:
                    'w-full! justify-between! bg-muted! rounded-md! pl-2! pr-3! py-2! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden!',
                  userButtonBox: 'flex-row-reverse! gap-2!',
                  userButtonOuterIdentifier:
                    'text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!',
                  userButtonAvatarBox: 'size-6!',
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar
