import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import {
  TiemposMuertosPlanta3CortePage,
  TiemposMuertosPlanta3EmbolsadoPage,
  TiemposMuertosPlanta3IQFPage,
  TiemposMuertosPlanta3Page,
} from "../ui/pages";

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
  component: TiemposMuertosPlanta3Page,
});

const planta3IQF = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-iqf",
  component: TiemposMuertosPlanta3IQFPage,
});

const planta3Embolsado = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-embolsado",
  component: TiemposMuertosPlanta3EmbolsadoPage,
});

const planta3Corte = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-corte",
  component: TiemposMuertosPlanta3CortePage,
});

/** Rutas a todo lo relacionado de las combustoleo */
export const tiemposMuertosRoutes = tiemposMuertosLayout.addChildren([
  planta1,
  planta3IQF,
  planta3Embolsado,
  planta3Corte,
]);
