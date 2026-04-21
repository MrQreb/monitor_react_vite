import * as React from "react"
import {
  Book,
  LineChart,
  Shield,
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
import { NavUser } from "./NavUser"
import { useEffect } from 'react';
import type { INavegationWep } from "../interface/INavWeb.interface"


const userData =
{
  nombreCompleto: "Jesus Eduardo Arias Diaz",
  email: "jarias@marbran.com",
  avatar: "/avatars/shadcn.jpg",
  usuario: "jarias",
  planta: "planta 1",
}

const navegation: INavegationWep = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LineChart,
      isActive: true,
      items: [
        {
          title: "General",
          url: "#",

        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
          items: [
            {
              title: "Profile",
              url: "#",
            },
            {
              title: "Security",
              url: "#",
            },
          ],
        },
      ],
    },

    {
      title: "Cátalagos",
      url: "#",
      icon: Book,
      isActive: false,

      items: [
        {
          title: "Usuarios",
          url: "#",
          icon: User,

          items: [
            {
              title: 'Permisos',
              url: '#',
              icon: Shield
            }
          ]

        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
         {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
        
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
}

/**
 * Sidebar de la aplicacion de web
 */
export function WepSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { setOpen } = useSidebar()

  useEffect(() => {
    setOpen(false)
  }, [])


  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <NavUser user={userData} />
      </SidebarHeader>
      <SidebarContent>
        <NavegationMain items={navegation.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />

    </Sidebar>
  )
}
