import type { Role } from "@/subsystems/usuarios/routes/ROLES";
import type { LucideIcon } from "lucide-react"



/**
 * Interface de cada item de navegación
 */
export interface INavegationItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;

  /**
   * Roles que pueden ver este item.
   * Si no se define → público
   */
  rolesPermitidos?: Role[];

  /**
   * Submenús
   */
  items?: INavegationItem[];
}

/**
 * Interface de navegación principal del sistema
 */
export interface INavegationWep {
  navMain: INavegationItem[];
}