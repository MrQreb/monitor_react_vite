import { baseUrl } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { GetUsuarioWithRolesResponse } from "../dto/get-usuario-with-roles-response";
/**
 * Clase encargada de los queries de los roles usaurios
 */
export class RolesUsuarioQueries {

    private readonly url: string;
    constructor() {
        if (!baseUrl) {
            throw new Error("La variable de entorno no esta incializada");
        }
        this.url = `${baseUrl}/api/v1/usuarios-roles/queries`;
    }

    getUsuarioWithRolesQuery = (usuarioId:number):Promise<GetUsuarioWithRolesResponse | undefined> => {
        return api(`${this.url}/${usuarioId}`);
    }
};