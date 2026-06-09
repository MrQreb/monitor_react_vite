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
export const tiemposMuertosLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tiempos-muertos",
});

export const tiemposMuertosPlanta3 = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3",
  component: TiemposMuertosPlanta3Page,
});

export const tiemposMuertosPlanta3IQF = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-iqf",
  component: TiemposMuertosPlanta3IQFPage,
});

export const tiemposMuertosPlanta3Embolsado = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-embolsado",
  component: TiemposMuertosPlanta3EmbolsadoPage,
});

export const tiemposMuertosPlanta3Corte = createRoute({
  getParentRoute: () => tiemposMuertosLayout,
  path: "/planta-3-corte",
  component: TiemposMuertosPlanta3CortePage,
});

/** Rutas a todo lo relacionado de las combustoleo */
export const tiemposMuertosRoutes = tiemposMuertosLayout.addChildren([
  tiemposMuertosPlanta3,
  tiemposMuertosPlanta3IQF,
  tiemposMuertosPlanta3Embolsado,
  tiemposMuertosPlanta3Corte,
]);
