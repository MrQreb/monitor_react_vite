import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { CarryOverPlanta1Page } from "../ui/pages/CarryOverPlanta1PAge";


/**
 * Url inicial de las temperaturas
 */
const carryOverLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carry-over",
});

const planta1 = createRoute({
  getParentRoute: () => carryOverLayout,
  path: "/planta-1",
  component: () => CarryOverPlanta1Page(),
});



// /** Rutas a todo lo relacionado de las combustoleo */
export const carryOverRoutes = carryOverLayout.addChildren([
  planta1,
]);
