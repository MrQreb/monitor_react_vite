import { rootRoute } from "./__root";
import { materiaPrimaRoutes } from "@/features/materia-prima/routes/routes";
import { createRoute } from "@tanstack/react-router";
import { MenuPage } from "@/features/menu/pages/MenuPage";
import { temperaturasRoutes } from "@/features/temperaturas/routes/routes";
import { combustoleoRoutes } from "@/features/combustoleo/routes/routes";
import { produccionDiariaRoutes } from "@/features/app-tags/routes/routes";
import { tiemposMuertosRoutes } from "@/features/tiempos-muertos/routes/routes";
import { loginRoute } from "@/features/auth/routes/routes";

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
  temperaturasRoutes,
  combustoleoRoutes,
  produccionDiariaRoutes,
  tiemposMuertosRoutes
]);
