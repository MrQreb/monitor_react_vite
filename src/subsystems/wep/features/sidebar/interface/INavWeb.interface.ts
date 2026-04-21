import type { LucideIcon } from "lucide-react"

/**
 * Inteface de cada item de navegacion
 */
export interface INavegationItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: INavegationItem[]
}

/**
 * Interface de navegacion de sistema WEP
 */
export interface INavegationWep {
  navMain: INavegationItem[]
}

