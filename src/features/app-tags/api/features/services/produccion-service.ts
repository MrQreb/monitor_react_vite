import { baseUrl } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { IProduccionService } from "../interfaces/i-produccion-service";
import type { ProduccionDiariaDto, ProduccionDiariaHoraDto } from "../dto";

type ApiEnvelope<T> = {
  success: boolean
  statusCode: number
  data: T
}

/**
 * Clase encargada de la lógica de app tags
 * Solo llamadas REST
 */
export class ProduccionService implements IProduccionService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1/apptags`;
  }

  async getProduccionDiaria(): Promise<ProduccionDiariaDto[]> {
    const response = await api<ApiEnvelope<ProduccionDiariaDto[]>>(`${this.url}/produccion-diaria-por-linea`);
    return Array.isArray(response?.data) ? response.data : []
  }

  async getProduccionPorHora(): Promise<ProduccionDiariaHoraDto[]> {
    const response = await api<ApiEnvelope<ProduccionDiariaHoraDto[]>>(`${this.url}/produccion-diaria-por-hora`);
    return Array.isArray(response?.data) ? response.data : []
  }
}
