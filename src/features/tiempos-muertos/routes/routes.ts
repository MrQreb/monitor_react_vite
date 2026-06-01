import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { TiemposMuertosPlanta3Page } from "../ui/pages/TiemposMuertosPlanta3Page";

/**
 * Url inicial de las temperaturas
 */
const tiemposMuertosLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tiempos-muertos",
});

const planta1 = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3",
  component:TiemposMuertosPlanta3Page,
});

/** Rutas a todo lo relacionado de las combustoleo */
export const tiemposMuertosRoutes = tiemposMuertosLayout.addChildren([
  planta1,
]);
