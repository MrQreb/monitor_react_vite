import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { TemperaturasCedis1Page, TemperaturasCedis2Page, TemperaturasPlanta1Page, TemperaturasTunel1Planta3Page, TemperaturasTunel2Planta3Page } from "../ui/pages";

/**
 * Url inicial de las temperaturas
 */
const temperaturasLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temperaturas",
});

const planta1 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-1",
  component: () => TemperaturasPlanta1Page(),
});

const tunel1Planta3 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-3/tunel-1",
  component: () => TemperaturasTunel1Planta3Page(),
});

const tunel2Planta3 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-3/tunel-2",
  component: () => TemperaturasTunel2Planta3Page(),
});

const cedis1 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/cedis-1",
  component: () => TemperaturasCedis1Page(),
});

const cedis2 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/cedis-2",
  component: () => TemperaturasCedis2Page(),
});


/** Rutas a todo lo relacionado de las temperaturas */
export const temperaturasRoutes = temperaturasLayout.addChildren([
  planta1,
  tunel1Planta3,
  tunel2Planta3,
  cedis1,
  cedis2
]);
