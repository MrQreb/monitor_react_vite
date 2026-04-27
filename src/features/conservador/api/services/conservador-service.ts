import { baseUrl } from "@/config/base-url-env.config";
import type { CarryOverCajasDto } from "../dto/carry-over-cajas-dto";
import type { CarryOverDto } from "../dto/carry-over-dto";
import type { IConservadorService } from "../interfaces/i-conservador-service";
import { api } from "@/shared/services/api";

/**
 * Clase encargada de la lógica de los datos de los conservador
 * Solo llamadas REST
 */
export class ConservadorService implements IConservadorService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1`;
  }

  async getCarryOverPlata1(): Promise<CarryOverDto> {
    return await api<CarryOverDto>(
      `${this.url}/conservador-planta-1/carry-over`,
    );
  }
  async getCarryOverPlata3(): Promise<CarryOverDto> {
    return await api<CarryOverDto>(
      `${this.url}/conservador-planta-3/carry-over`,
    );
  }
  async getCarryOverCajasPlanta3(): Promise<CarryOverCajasDto> {
    return await api<CarryOverCajasDto>(
      `${this.url}/conservador-planta-3/cajas`,
    );
  }
}
