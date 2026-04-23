import { loginRoute } from "@/features/auth/login/routes/routes";
import { rootRoute } from "./__root";
import { materiaPrimaRoutes } from "@/features/materia-prima/routes/routes";
import { createRoute } from "@tanstack/react-router";
import { MenuPage } from "@/features/menu/pages/MenuPage";
import { temperaturasRoutes } from "@/features/temperaturas/routes/routes";

/**
 * Arreglo de rutas donde se importan todas las rutas de la aplicacion
 */

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: MenuPage,
});

export const routeTree = rootRoute.addChildren([
  loginRoute,
  materiaPrimaRoutes,
  menuRoute,
  temperaturasRoutes
]);
