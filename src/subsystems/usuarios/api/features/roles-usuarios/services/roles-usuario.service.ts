import { baseUrl } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { CreateMultipliRolesUsuarioDto } from "../dto/create-multipli-roles-usuario-dto";

/**
 * Clase encarga de la logica de los roles del sistema de usaurios
 */
export class RolesUsuario {

    private readonly url: string;

    constructor() {
        if (!baseUrl) {
            throw new Error("La variable de entorno no esta incializada");
        }
        this.url = `${baseUrl}/api/v1/usuarios/roles`;
    }

    /** Inserta roles y elimina los roles que no se mandaron previamente. */
    replaceRoles = (dto:CreateMultipliRolesUsuarioDto) => {
        return api(`${this.url}/remplazar-multiples`,
            {
                method:'POST',
                body:JSON.stringify(dto),
            }
        );
    }

};