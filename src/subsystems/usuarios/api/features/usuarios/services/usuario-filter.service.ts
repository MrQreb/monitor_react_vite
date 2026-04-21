import { baseUrl } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { UsuarioResponseDto } from "../dto";

//Dto de busqueda
export type UsuarioFilterDto = {
    nombre?: string;
    correo?: string;
    turno?: number;
    estaActivo?: boolean;
    estaEliminado?: boolean;
    nombrePlanta?: string;
    page?: number;
    pageSize?: number;
};



//
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalItems: number,
    totalPages: number,
    hasNext: boolean,
    hasPrevious: boolean
}

/**
 * Clase encargada de la logica del crud de usuarios
 */
export class UsuarioFilter {

    /**Url base de usuarios */
    private urlUsuario: string;

    constructor() {
        if (!baseUrl) {
            throw new Error("La variable de entorno no esta incializada");
        }

        this.urlUsuario = `${baseUrl}/api/v1/usuarios/filtros`;
    }

    getByFilters = async (
        filters: UsuarioFilterDto
    ): Promise<PaginatedResponse<UsuarioResponseDto>> => {
        const params = new URLSearchParams();

        if (filters.nombre) params.append("Nombre", filters.nombre);
        if (filters.correo) params.append("Correo", filters.correo);
        if (filters.turno !== undefined) params.append("Turno", filters.turno.toString());
        if (filters.estaActivo !== undefined) params.append("EstaActivo", filters.estaActivo.toString());
        if (filters.estaEliminado !== undefined) params.append("EstaEliminado", filters.estaEliminado.toString());
        if (filters.nombrePlanta) params.append("NombrePlanta", filters.nombrePlanta);

        if (filters.page) params.append("Page", filters.page.toString());
        if (filters.pageSize) params.append("PageSize", filters.pageSize.toString());

        const url = `${this.urlUsuario}?${params.toString()}`;

        return await api<PaginatedResponse<UsuarioResponseDto>>(url);
    };
}