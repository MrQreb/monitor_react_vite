import { loginRoute } from "@/features/auth/routes/routes";
import { rootRoute } from "./__root";
import { wepRoutes } from "@/subsystems/wep/routes/routes";
import { usuariosRoutes } from "@/subsystems/usuarios/routes/routes";
import Unauthorized from "../Layouts/Unathorized";
import { createRoute } from "@tanstack/react-router";


export const unauthorized = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sin-permisos',
  component: Unauthorized,
});

/**
 * Arreglo de rutas donde se importan todas las rutas de la aplicacion
 */
export const routeTree = rootRoute.addChildren([
  loginRoute,
  wepRoutes,
  usuariosRoutes,
  unauthorized
]);

