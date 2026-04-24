import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { TiemposMuertosPlanta1 } from "../ui/pages/TiemposMuertoPlanta1";

/**
 * Url inicial de las temperaturas
 */
const tiemposMuertosLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tiempos-muertos",
});

const planta1 = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-1",
  component: () => TiemposMuertosPlanta1(),
});

/** Rutas a todo lo relacionado de las combustoleo */
export const tiemposMuertosRoutes = tiemposMuertosLayout.addChildren([
  planta1,
]);
