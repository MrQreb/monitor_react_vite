import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { ProduccionDiariaPage } from "../ui/pages/ProduccionDiariaPage";

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



// /** Rutas a todo lo relacionado de las combustoleo */
export const produccionDiariaRoutes = appTagsLayout.addChildren([
  produccionDiariaRoute,
]);
