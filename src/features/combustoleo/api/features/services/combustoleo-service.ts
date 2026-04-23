import { baseUrl } from "@/config/base-url-env.config";

import { api } from "@/shared/services/api";
import type { ICombustoleoService } from "../interfaces/i-combustoleo-service";
import type { CombustoleoDto } from "../dto/combustoleo-dto";

/**
 * Clase encargada de la lógica de los datos de los combustoleos
 * Solo llamadas REST
 */
export class CombustoleoService implements ICombustoleoService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1`;
  }
  getCombustoleoPlanta1(): Promise<CombustoleoDto[]> {
    return api<CombustoleoDto[]>(`${this.url}/combustolio/planta-1`);
  }
  getCombustoleoPlanta3(): Promise<CombustoleoDto[]> {
    return api<CombustoleoDto[]>(`${this.url}/combustolio/planta-3`);
  }
}
