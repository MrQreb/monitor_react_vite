import {
  ChevronsUpDown,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  UserPen,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/app/providers/ThemeProvider"
import { useUsuarioStore } from "@/shared/store/usuario.store"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { baseUrl } from "@/config/base-url-env.config"

/**
 * Componente derivado del sidebar. (comun entre sistemas)
 * Encargado de mostrar los datos del usuario logueado del sistema.
 */
export function NavUser() {

  //Estados globales
  const { theme, setTheme } = useTheme()
  const { usuario, clearUsuario, setIsAuthenticated } = useUsuarioStore();


  const navigate = useNavigate();
  const { isMobile } = useSidebar()
  const usuarioData = usuario?.usuario;
  const isDark = theme === "dark"
  const usuarioImage: string = `${baseUrl}/${usuarioData?.urlImagen}`;


  /** Obtiene las iniciales de los nombres */
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  /** Borrar los datos del usuario cachedo, y redirige al login */
  const handleLogOut = () => {
    clearUsuario();
    setIsAuthenticated(false);

    toast.warning('Sesión cerrada');
    navigate({
      to: '/'
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group/user-btn relative data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-all duration-200"
            >
              {/* Avatar con indicador de estado */}
              <div className="relative">
                <Avatar className="h-9 w-9 rounded-lg transition-all duration-200">
                  <AvatarImage
                    src={usuarioImage}
                    alt={usuarioData?.nombreCompleto}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary/80 to-primary text-primary-foreground font-semibold text-sm">
                    {getInitials(usuarioData?.nombreCompleto || "US")}
                  </AvatarFallback>
                </Avatar>

                {/* Indicar del estado en linea */}
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-emerald-500" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">
                  {usuarioData?.nombreCompleto}
                </span>
                {/* <span className="truncate text-xs text-sidebar-foreground/60">
                  {usuarioData?.turno}
                </span> */}
              </div>

              {/* Badge de notificaciones */}
              {/* {usuarioData?.notificaciones > 0 && (
                <Badge
                  variant="destructive"
                  className="h-5 min-w-5 px-1.5 text-[10px] font-bold"
                >
                  {usuarioData.notificaciones > 9 ? "9+" : usuarioData.notificaciones}
                </Badge>
              )} */}

              <ChevronsUpDown className="ml-auto size-4 text-sidebar-foreground/50 group-hover/user-btn:text-sidebar-foreground transition-colors" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-72 rounded-xl p-0 shadow-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            {/* Header del usuario */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-xl">
                    <AvatarImage
                      src={usuarioImage}
                      alt={usuarioData?.nombreCompleto}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-base">
                      {getInitials(usuarioData?.nombreCompleto || "US")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">
                      {usuarioData?.nombreCompleto}
                    </span>
                    <span className="text-base text-muted-foreground">
                      {usuarioData?.planta}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </div>

            <DropdownMenuSeparator className="m-0" />

            {/* Opciones de cuenta */}
            <div className="p-1.5">
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <UserPen className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Mi Perfil</span>
                    <span className="text-xs text-muted-foreground">
                      Editar información personal
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1.5" />

              {/* Configuración y preferencias */}
              <DropdownMenuGroup>

                {/* Theme toggle */}
                <DropdownMenuItem
                  className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                    {isDark ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">Modo Oscuro</span>
                    <span className="text-xs text-muted-foreground">
                      {isDark ? "Activado" : "Desactivado"}
                    </span>
                  </div>
                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                    className="data-[state=checked]:bg-violet-500"
                  />
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1.5" />

              {/* Ayuda y soporte */}
              <DropdownMenuItem className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Ayuda y Soporte</span>
                  <span className="text-xs text-muted-foreground">
                    Centro de ayuda
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1.5" />

              {/* Cerrar sesión */}
              <DropdownMenuItem
                onClick={() => handleLogOut()}
                variant="destructive"
                className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Cerrar Sesión</span>
                  <span className="text-xs opacity-70">
                    Salir de la cuenta
                  </span>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
