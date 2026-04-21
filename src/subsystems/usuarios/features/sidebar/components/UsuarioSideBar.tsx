import {
  CirclePlus,
  Factory,
  Shield,
  Table2,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavegationMain } from "./NavMain"
import { useEffect, useMemo } from 'react';
import type { INavegationWep } from "../interface/INavWeb.interface"
import { Role } from "@/subsystems/usuarios/routes/ROLES"
import { useUsuarioStore } from "@/shared/store/usuario.store"
import { RequireRolesService } from "@/subsystems/usuarios/services/require-roles.service"
import { NavUser } from "@/components/common/Sidebar/NavUser/NavUser";
import { PREFIX_USUARIOS, ROUTES_USUARIOS } from "@/subsystems/usuarios/routes/ROUTES_USUARIOS";

const navegation: INavegationWep = {
  navMain: [
    {
      title: "Usuarios",
      url: "#",
      icon: User,
      rolesPermitidos: [Role.admin],
      items: [
        {
          title: "Tabla",
          url: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.tablaUsuarios}`,
          icon: Table2,
          rolesPermitidos: [Role.admin, Role.usuarios],

        },
        {
          title: "Crear",
          url: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.crearUsuario}`,
          icon: CirclePlus,
          rolesPermitidos: [Role.admin, Role.usuarios],

        }
      ],
    },
    {
      title: "Planta",
      url: "#",
      icon: Factory,
      rolesPermitidos: [Role.admin],
      items: [
        {
          title: "Tabla",
          url: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.crearPlanta}`,
          icon: Table2,
          rolesPermitidos: [Role.admin, Role.usuarios],

        },
        {
          title: "Crear",
          url: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.crearPlanta}`,
          icon: CirclePlus,
          rolesPermitidos: [Role.admin, Role.usuarios],

        }
      ],
    },
    {
      title: "Roles",
      url: "#",
      icon: Shield,
      rolesPermitidos: [Role.admin],
      items: [
        {
          title: "Tabla",
          url: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.crearRol}`,
          icon: Table2,
          rolesPermitidos: [Role.admin, Role.usuarios],

        },
        {
          title: "Crear",
          url: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.crearPlanta}`,
          icon: CirclePlus,
          rolesPermitidos: [Role.admin, Role.usuarios],

        }
      ],
    },
  ],
}


/**
 * Sidebar de la aplicacion de web
 */
export function UsuarioSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { setOpen } = useSidebar()

  useEffect(() => {
    setOpen(false)
  }, [])


  const usuario = useUsuarioStore(state => state.usuario);



  const navegationFiltrada = useMemo(() => {
    if (!usuario) return { navMain: [] };

    const roleService = new RequireRolesService();

    return {
      ...navegation,
      navMain: roleService.filterNavigation(navegation.navMain)
    };
  }, [usuario]);


  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <NavUser />

      </SidebarHeader>
      <SidebarContent>
        <NavegationMain items={navegationFiltrada.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />

    </Sidebar>
  )
}
