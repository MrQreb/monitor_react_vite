import type { RolUsuario } from "../../roles-usuarios/dto/rol-usuario-dto";

/**
 * Roles y toke del sistema de usuarios
 */
export interface SistemaUsuariosDto{
    roles:RolUsuario[] | null;
    token:string | null;
}