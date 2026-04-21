import type { RolUsuarioDto } from "./rol-usuario-dto";

export interface SistemaWepDto{
    roles:RolUsuarioDto[];
    token:string;
} 