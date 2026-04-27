import { baseUrl } from "@/config/base-url-env.config";
import type { LoginResponseDto } from "../dto/login-response-dto";
import { api } from "@/shared/services/api";
import type { LoginDto } from "../dto/login-dto";

/** Claser que permite la autenticacion */
export class LoginService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1`;
  }

  /** Permite iniciar sesion del sistema de usuarios */
  async login(data:LoginDto): Promise<LoginResponseDto> {
    return await api<LoginResponseDto>(`${this.url}/usuario/iniciar-sesion`,{
        method:"POST",
        body:JSON.stringify(data)
    });
  }
}
