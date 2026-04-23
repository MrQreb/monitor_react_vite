import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { TemperaturasPlanta1, TemperaturasTunel1Planta3, TemperaturasTunel2Planta3 } from "../ui/pages";

const temperaturasLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temperaturas",
});

const planta1 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-1",
  component: () => TemperaturasPlanta1(),
});

const tunel1Planta3 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-3/tunel-1",
  component: () => TemperaturasTunel1Planta3(),
});

const tunel2Planta3 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-3/tunel-2",
  component: () => TemperaturasTunel2Planta3(),
});

export const temperaturasRoutes = temperaturasLayout.addChildren([
  planta1,
  tunel1Planta3,
  tunel2Planta3
]);
