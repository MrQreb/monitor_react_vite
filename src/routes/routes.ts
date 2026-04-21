// import { createRoute } from "@tanstack/react-router";
// import { rootRoute } from "@/app/router/__root";
// import { requireAuth } from "@/app/router/auth-guard";
// import { Role } from "./ROLES";
// import { PREFIX_USUARIOS, ROUTES_USUARIOS } from "./ROUTES_USUARIOS";
// import { RequireRolesService } from "@/subsystems/usuarios/services/require-roles.service";
// import UsuarioLayouyt from "@/subsystems/usuarios/layout/UsuarioLayout";
// import { CrearPlantaPage } from "@/subsystems/usuarios/features/plantas/crear/pages/CrearPlantaPage";
// import { CrearUsuarioPage } from "@/subsystems/usuarios/features/usuarios/creacion/pages/CrearUsuarioPage";
// import TablaUsuariosPage from "@/subsystems/usuarios/features/usuarios/tabla/pages/TablaUsuariosPage";
// import { CrearRol } from "@/subsystems/usuarios/features/rol/crear/pages/CrearRol";
// import DashboardPage from "@/features/materia-prima/dashboard/pages/DashboardPage";

// const requireRolesService = new RequireRolesService();

// //Rutas a lo relacionado a sistema de usuariosROUTES_USUARIOS.asignarRoles
// const usuarioLayoutRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: PREFIX_USUARIOS,
//   component: UsuarioLayouyt,
//   beforeLoad: () => {
//     requireAuth();
//   },
// });

// const crearPlantas = createRoute({
//   getParentRoute: () => usuarioLayoutRoute,
//   path: ROUTES_USUARIOS.crearPlanta,
//   component: CrearPlantaPage,
//   beforeLoad: () => {
//     requireRolesService.verifyRoles([Role.admin, Role.usuarios, Role.roles]);
//   },
// });

// const crearUsuario = createRoute({
//   getParentRoute: () => usuarioLayoutRoute,
//   path: ROUTES_USUARIOS.crearUsuario,
//   component: CrearUsuarioPage,
// });

// // const asignarRoles = createRoute({
// //   getParentRoute: () => usuarioLayoutRoute,
// //   path: ROUTES_USUARIOS.asignarRoles,
// //   component: AsignRolesPage,
// // });

// const tablaUsuarios = createRoute({
//   getParentRoute: () => usuarioLayoutRoute,
//   path: ROUTES_USUARIOS.tablaUsuarios,
//   component: TablaUsuariosPage,
// });

// const crearRol = createRoute({
//   getParentRoute: () => usuarioLayoutRoute,
//   path: ROUTES_USUARIOS.crearRol,
//   component: CrearRol,
// });

// const materiaPrima = createRoute({
//   getParentRoute: () => usuarioLayoutRoute,
//   path: ROUTES_USUARIOS.crearRol,
//   component: DashboardPage,
// });

// //Rutas que se mandaran al enrutador principal
// export const usuariosRoutes = usuarioLayoutRoute.addChildren([
//   crearPlantas,
//   crearUsuario,
//   // asignarRoles,
//   tablaUsuarios,
//   crearRol,
//   materiaPrima
// ]);
