import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { ProduccionDiariaPage } from "../ui/pages/ProduccionDiariaPage";
import { ProduccionHoraPage } from "../ui/pages/ProduccionHoraPage";
import { ProduccionHoraColoresPage } from "../ui/pages/ProduccionHoraColoresPage";

/**
 * Url inicial de las temperaturas
 */
const appTagsLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app-tags",
});

const produccionDiariaRoute = createRoute({
  getParentRoute: () => appTagsLayout,
  path: "/planta-1",
  component: () => ProduccionDiariaPage(),
});

const produccionHoraRoute = createRoute({
  getParentRoute: () => appTagsLayout,
  path: "/planta-1/por-hora",
  component: () => ProduccionHoraPage(),
});

const produccionHoraColoresRoute = createRoute({
  getParentRoute: () => appTagsLayout,
  path: "/planta-1/por-hora-colores",
  component: () => ProduccionHoraColoresPage(),
});


// /** Rutas a todo lo relacionado de las combustoleo */
export const produccionDiariaRoutes = appTagsLayout.addChildren([
  produccionDiariaRoute,
  produccionHoraRoute,
  produccionHoraColoresRoute
]);
