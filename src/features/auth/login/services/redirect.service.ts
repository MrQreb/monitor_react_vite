import type { AuthResponseDto } from "@/subsystems/usuarios/api/features/autenticacion/dto/auth-response-dto";
import { toast } from "sonner";

type NavigateFn = ReturnType<typeof import("@tanstack/react-router").useNavigate>;

/**
 * Servicio encargado de manejar la lógica de autorización y redirección
 * posterior al login, basado en el sistema seleccionado y los roles del usuario.
 *
 * @example
 * ```ts
 * const authService = new AuthService(navigate);
 * authService.handleLoginRedirect(usuario, system.name);
 * ```
 */
export class AuthService {
  /**
   * Función de navegación proveniente de TanStack Router.
   */
  private readonly navigate: NavigateFn;

  /**
   * Crea una instancia del servicio de autenticación.
   *
   * @param navigate Función para redireccionar rutas
   */
  constructor(navigate: NavigateFn) {
    this.navigate = navigate;
  }

  /**
   * Maneja la redirección después de un login exitoso.
   *
   * - Valida si el usuario tiene acceso al sistema seleccionado
   * - Si tiene acceso, lo redirige a la ruta correspondiente
   * - Si no tiene acceso, muestra un error
   *
   * @param usuario Información del usuario autenticado
   * @param systemName Nombre del sistema seleccionado
   */
  public handleLoginRedirect(
    usuario: AuthResponseDto,
    systemName: string
  ): void {
    const hasAccess = this.hasAccess(usuario, systemName);

    if (!hasAccess) {
      this.handleUnauthorized();
      return;
    }

    const route = this.getRouteBySystem(systemName);

    this.navigate({
      to: route,
      replace: true,
    });
  }

  /**
   * Determina si el usuario tiene acceso al sistema seleccionado.
   *
   * @param usuario Usuario autenticado
   * @param systemName Nombre del sistema
   * @returns true si tiene acceso, false en caso contrario
   */
  private hasAccess(
    usuario: AuthResponseDto,
    systemName: string
  ): boolean {
    switch (systemName) {
      case "Usuarios":
        return this.hasUsuariosRoles(usuario);

      default:
        return false;
    }
  }

  /**
   * Valida si el usuario tiene roles dentro del sistema de usuarios.
   *
   * @param usuario Usuario autenticado
   * @returns true si tiene al menos un rol asignado
   */
  private hasUsuariosRoles(usuario: AuthResponseDto): boolean {
    const roles = usuario.sistemaUsuariosDto?.roles ?? [];
    return roles.length > 0;
  }

  /**
   * Obtiene la ruta de redirección según el sistema seleccionado.
   *
   * @param systemName Nombre del sistema
   * @returns Ruta correspondiente o "/" por defecto
   */
  private getRouteBySystem(systemName: string): string {
    const routes: Record<string, string> = {
      Usuarios: "/usuarios/planta/crear/planta",
    };

    return routes[systemName] ?? "/";
  }

  /**
   * Maneja el caso en el que el usuario no tiene permisos.
   *
   * Muestra un mensaje de error en pantalla.
   */
  private handleUnauthorized(): void {
    toast.error("No tienes permiso para el sistema");
  }
}