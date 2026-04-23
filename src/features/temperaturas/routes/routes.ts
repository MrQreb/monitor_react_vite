import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { TemperaturasPlanta1 } from "../ui/pages/TemperaturaPlanta1";

const temperaturasLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temperaturas",
});

const temperaturas1 = createRoute({
  getParentRoute: () => temperaturasLayout,
  path: "/planta-1/viajes",
  component: () => TemperaturasPlanta1(),
});

export const temperaturasRoutes = temperaturasLayout.addChildren([
  temperaturas1,
]);
