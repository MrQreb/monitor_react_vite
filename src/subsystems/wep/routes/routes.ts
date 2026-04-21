import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/router/__root'
import WepLayout from '../layouts/WepLayout'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import { CrearPermisos } from '../features/usuarios/permisos/pages/CrearPermisos'

//Rutas a lo relacionado a wep
//Ruta padre
export const wepLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wep',
  component: WepLayout,
  
})


//Ruta del dashboard
export const dashboardRoute = createRoute({
  getParentRoute: () => wepLayoutRoute,
  path: '/', 
  component: DashboardPage,
})


export const crearPermisos = createRoute({
  getParentRoute: () => wepLayoutRoute,
  path:'/asignar-permisos',
  component:CrearPermisos,
});

//Rutas que se mandaran al enrutador principal
export const wepRoutes = wepLayoutRoute.addChildren([
  dashboardRoute,
  crearPermisos
])