import { baseUrl } from "@/config/base-url-env.config";
import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";
import type { ITiempoMuertoService } from "../interface/i-tiempo-muerto-service";
import { api } from "@/shared/services/api";

export class TiempoMuertoService implements ITiempoMuertoService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1/tiempos-muertos`;
  }

  async getTiemposCurso(): Promise<TiempoMuertoDto[]> {
    return api<TiempoMuertoDto[]>(`${this.url}/en-curso`);
  }
  async getTiemposFinalizados(): Promise<TiempoMuertoDto[]> {
    return api<TiempoMuertoDto[]>(`${this.url}/finalizados`);
  }
}
