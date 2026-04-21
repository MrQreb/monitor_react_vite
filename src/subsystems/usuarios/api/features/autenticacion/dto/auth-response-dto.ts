import type { SistemaWepDto } from "@/subsystems/wep/api/features/usuario-roles/dto/sistema-wep-dto";
import type { UsuarioResponseDto } from "../../usuarios/dto";
import type { SistemaUsuariosDto } from "./sistema-usuarios-dto";

export interface AuthResponseDto{
    usuario:UsuarioResponseDto;
    sistemaUsuariosDto:SistemaUsuariosDto;
    sistemaWepDto:SistemaWepDto;
}