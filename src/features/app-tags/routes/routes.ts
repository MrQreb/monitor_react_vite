import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { CombustoleoPlanta1Page, CombustoleoPlanta3Page } from "../ui/pages";

/**
 * Url inicial de las temperaturas
 */
// const combustoleoLayout = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/combustoleo",
// });

// const planta1 = createRoute({
//   getParentRoute: () => combustoleoLayout,
//   path: "/planta-1",
//   component: () => CombustoleoPlanta1Page(),
// });

// const planta3 = createRoute({
//   getParentRoute: () => combustoleoLayout,
//   path: "/planta-3",
//   component: () => CombustoleoPlanta3Page(),
// });


// /** Rutas a todo lo relacionado de las combustoleo */
// export const combustoleoRoutes = combustoleoLayout.addChildren([
//   planta1,
//   planta3,
// ]);
