import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SidebarHeader } from "@/components/ui/sidebar";
import { CheckIcon, ChevronDown, User } from "lucide-react";
import { useUsuarioStore } from "@/shared/store/usuario.store";
import { useNavigate } from "@tanstack/react-router";
import type { ISystem } from "@/features/auth/login/interface/system.interface";
import { SYSTEMS } from "@/features/auth/login/const/SYSTEMS";
import { cn } from "@/lib/utils";
import { useSystemStore } from "@/features/auth/login/store/system.store";
import { useEffect } from "react";
/**
 * Componente encargado de navegar entre sistemeas.
 */
export const DropdownSistemas = () => {
  //Estados globales
  let { setSystem, system } = useSystemStore();
  const { usuario } = useUsuarioStore();

  const navigate = useNavigate();


  const filteredSistemas = SYSTEMS.filter(
    (sistema) => sistema.hasAccess?.(usuario) ?? true
  );


  /**
   * Redirige a una ruta de los sitemas.
   * @param system - Sistema al que seleccciona.
   */
  const redirectToSistema = (system: ISystem) => {

    if (system.name === 'App Tags') {
      navigate({
        to: '/usuarios/planta/crear/planta'
      });
    };

    if (system.name === 'WEP') {
      navigate({
        to: '/wep/crear-permisos'
      });
    };

    if (system.name === 'Usuarios') {
      navigate({
        to: '/usuarios/usuario/crear'
      });
    }
  }

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <section className="mb-1 flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-muted/50 transition cursor-pointer">

            {/* Left */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                {system.icon ? (
                  <system.icon className="size-4" />
                ) : (
                  <User className="size-4" />
                )}
              </div>

              <div className="min-w-0">
                <SidebarHeader className="truncate text-xs font-bold uppercase tracking-[0.18em] text-foreground">
                  {system.name}
                </SidebarHeader>


              </div>
            </div>

            {/* Right */}
            <ChevronDown className="size-4 text-muted-foreground" />
          </section>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-64 rounded-xl">
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Sistemas
          </DropdownMenuLabel>

          {filteredSistemas.map((item) => {
            const isActive = system.id === item.id;

            return (
              <DropdownMenuItem
                key={item.id}
                onClick={() => {
                  setSystem(item);
                  redirectToSistema(system);
                }
                }
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer",
                  isActive && "bg-primary/10"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md",
                    isActive
                      ? "bg-gray-300 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.icon ? (
                    <item.icon className="size-4" />
                  ) : (
                    <User className="size-4" />
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 leading-tight">
                  <span className="text-sm font-medium truncate">
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="text-[10px] text-primary font-semibold">
                      Activo
                    </span>
                  )}
                </div>

                {/* Check */}
                {isActive && (
                  <CheckIcon className="ml-auto size-4 text-primary" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};