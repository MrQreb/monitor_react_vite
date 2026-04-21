/** Roles que protegen las rutas definidas */
export const Role = {
  admin: "admin",
  usuarios: "usuarios",
  roles: "roles",
  rolesUsuario: "roles-usuario",
} as const;

export type Role = (typeof Role)[keyof typeof Role];