import { loginRoute } from "@/features/auth/routes/routes";
import { rootRoute } from "./__root";
import { materiaPrimaRoutes } from "@/features/materia-prima/routes/routes";

/**
 * Arreglo de rutas donde se importan todas las rutas de la aplicacion
 */
export const routeTree = rootRoute.addChildren([
  loginRoute,
  materiaPrimaRoutes,
]);

