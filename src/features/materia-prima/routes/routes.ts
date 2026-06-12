import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router/__root"; import ViajesEstatusPlanta3Page from "../ui/pages/ViajesEstatusPlanta3Page";
import ViajesEstatusPlanta1Page from "../ui/pages/ViajesEstatusPlanta1Page";
import ViajesEstatusGraficaPlanta3Page from "../ui/pages/ViajesEstatusGraficaPlanta3Page";
import ViajesEstatusGraficaPlanta1Page from "../ui/pages/ViajesEstatusGraficaPlanta1Page";
import { CompativoGraficaCajas } from "../ui/pages/CompativoGraficaCajas";
import { DashboardMateriaPrimaPlanta1Page } from "../ui/pages";
import { DashboardMateriaPrimaPlanta3Page } from "../features/dashboard/pages/DashboardMateriaPrimaPlanta3Page";


const materiaPrimaLayout = createRoute({
    getParentRoute: () => rootRoute,
    path: 'materia-prima',
});

const viajesProgramadosPlanta1 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-1/viajes",
    component: ViajesEstatusPlanta1Page,
});

const viajesProgramadosPlanta3 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-3/viajes",
    component: ViajesEstatusPlanta3Page,
});

const viajesCajasPlanta1 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-1/viajes-cajas",
    component: ViajesEstatusGraficaPlanta1Page,
});

const viajesCajasPlanta3 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-3/viajes-cajas",
    component: ViajesEstatusGraficaPlanta3Page,
});


const compativoCajas = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/compartivo-cajas",
    component: CompativoGraficaCajas,
});


const dashboardPlanta1 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-1/dashboard",
    component: DashboardMateriaPrimaPlanta1Page,
});

const dashboardPlanta3 = createRoute({
    getParentRoute: () => materiaPrimaLayout,
    path: "/planta-3/dashboard",
    component: DashboardMateriaPrimaPlanta3Page,
});

export const materiaPrimaRoutes = materiaPrimaLayout.addChildren([
    viajesProgramadosPlanta1,
    viajesProgramadosPlanta3,
    viajesCajasPlanta1,
    viajesCajasPlanta3,
    compativoCajas,
    dashboardPlanta1,
    dashboardPlanta3
]);