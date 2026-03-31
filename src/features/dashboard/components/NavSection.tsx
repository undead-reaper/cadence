import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { MenuItem } from '@/features/dashboard/types/MenuItem'
import { Link } from '@tanstack/react-router'

type Props = Readonly<{
  label?: string
  items: MenuItem[]
  pathname: string
}>

const NavSection = ({ items, label, pathname }: Props) => {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.label}
              >
                {item.url ? (
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.label}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default NavSection
