import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { TiemposMuertosPlanta3Page } from "../ui/pages/TiemposMuertosPlanta3Page";
import { TiemposMuertosPlanta3IQFPage } from "../ui/pages/TiemposMuertosPlanta3IQFPage";

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

const planta3IQF = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-iqf",
  component:TiemposMuertosPlanta3IQFPage,
});

/** Rutas a todo lo relacionado de las combustoleo */
export const tiemposMuertosRoutes = tiemposMuertosLayout.addChildren([
  planta1,
  planta3IQF
]);
