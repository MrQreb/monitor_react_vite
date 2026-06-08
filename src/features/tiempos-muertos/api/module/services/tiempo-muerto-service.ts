import { baseUrlRESTMonitorASP } from "@/config/base-url-env.config";
import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";
import type { ITiempoMuertoService } from "../interface/i-tiempo-muerto-service";
import { api } from "@/shared/services/api";

/** Encargada de la logica de los metodos tiempos muertos por API REST */
export class TiempoMuertoService implements ITiempoMuertoService {
  private readonly url: string;

  constructor() {
    if (!baseUrlRESTMonitorASP) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrlRESTMonitorASP}/api/v1/tiempos-muertos`;
  }
  
  async getTiemposCursoByAreaIdAsync(idArea: number): Promise<TiempoMuertoDto[]> {
     return api<TiempoMuertoDto[]>(`${this.url}/en-curso-por-area/${idArea}`);
  }

  async getTiemposCursoAsync(): Promise<TiempoMuertoDto[]> {
    return api<TiempoMuertoDto[]>(`${this.url}/en-curso`);
  } 
  async getTiemposFinalizadosAsync(): Promise<TiempoMuertoDto[]> {
    return api<TiempoMuertoDto[]>(`${this.url}/finalizados`);
  }
}
