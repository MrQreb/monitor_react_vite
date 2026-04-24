import { baseUrl } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { IProduccionService } from "../interfaces/i-produccion-service";
import type { ProduccionDiariaDto, ProduccionDiariaHoraDto } from "../dto";

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

  getProduccionDiaria(): Promise<ProduccionDiariaDto[]> {
    return api<ProduccionDiariaDto[]>(`${this.url}/produccion-diaria-por-linea`);
  }
  getProduccionPorHora(): Promise<ProduccionDiariaHoraDto[]> {
    return api<ProduccionDiariaHoraDto[]>(`${this.url}/produccion-diaria-por-hora`);
  }
}
