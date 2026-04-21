import { createRoute } from "@tanstack/react-router";
import DashboardPage from "@/features/materia-prima/dashboard/pages/DashboardPage";
import { rootRoute } from "@/app/router/__root";
import ViajesProgramadosPage from "../dashboard/pages/ViajesProgramadosPage";


const materiaPrimaLayout = createRoute({
    getParentRoute: () => rootRoute,
    path: '/materia-prima',
    //   component: Layout,
});

const materiaPrima = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-1",
    component: DashboardPage,
});


const viajesProgramadosPlanta1 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-1/viajes",
    component: ViajesProgramadosPage,
});

export const materiaPrimaRoutes = materiaPrimaLayout.addChildren([
    materiaPrima,
    viajesProgramadosPlanta1
]);