import { baseUrl } from '@/config/base-url-env.config';
import type { AuthResponseDto } from '../dto/auth-response-dto';
import type { LoginDto } from '../dto/login-dto';
import type { IAutenticacionRepository } from '../interfaces/i-autenticacion-repository';
import { api } from '@/shared/services/api';

/**
 * Servicio encargado de la autenticacion, del login del usuario
 */
export class AutenticacionService implements IAutenticacionRepository {

    private readonly urlAutenticacion: string;

    constructor() {
        if (!baseUrl) {
            throw new Error("La variable de entorno no esta incializada");
        }
        
        this.urlAutenticacion = `${baseUrl}/api/v1/autenticacion`;
    }
    /**
     * 
     * @param data - LoginDto, contiene el usuario y contraseña
     * @returns - Promise
     */
    login = async (data: LoginDto): Promise<AuthResponseDto> => {
        return await api(this.urlAutenticacion, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

}