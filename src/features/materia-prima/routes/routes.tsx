import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router/__root"; import ViajesEstatusPlanta3Page from "../dashboard/pages/ViajesEstatusPlanta3Page";
import ViajesEstatusPlanta1Page from "../dashboard/pages/ViajesEstatusPlanta1Page";
import ViajesEstatusGraficaPlanta3Page from "../dashboard/pages/ViajesEstatusGraficaPlanta3Page";
import ViajesEstatusGraficaPlanta1Page from "../dashboard/pages/ViajesEstatusGraficaPlanta1Page";
import { CompativoGraficaCajas } from "../dashboard/pages/CompativoGraficaCajas";


const materiaPrimaLayout = createRoute({
    getParentRoute: () => rootRoute,
    path: '/materia-prima',
    //   component: Layout,
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



export const materiaPrimaRoutes = materiaPrimaLayout.addChildren([
    viajesProgramadosPlanta1,
    viajesProgramadosPlanta3,
    viajesCajasPlanta1,
    viajesCajasPlanta3,
    compativoCajas
]);