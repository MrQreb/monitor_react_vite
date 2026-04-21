import { createRoute } from "@tanstack/react-router";
import DashboardPage from "@/features/materia-prima/dashboard/pages/DashboardPage";
import { rootRoute } from "@/app/router/__root";




const materiaPrimaLayout = createRoute({
  getParentRoute: () => rootRoute,
  path:'/materia-prima'
});

const materiaPrima = createRoute({
  getParentRoute: () => materiaPrimaLayout,
  path: "/planta-1",
  component: DashboardPage,
});

export const materiaPrimaRoutes = materiaPrimaLayout.addChildren([
  materiaPrima,
]);