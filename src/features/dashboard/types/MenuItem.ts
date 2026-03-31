import type { LucideIcon } from 'lucide-react'

export type MenuItem = {
  label: string
  url?: string
  icon: LucideIcon
  onClick?: () => void
}
