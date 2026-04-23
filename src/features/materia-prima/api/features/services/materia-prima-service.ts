import { baseUrl } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { IMateriaService } from "../interfaces/i-materia-prima-service";
import type {
  ViajeProgramadoDto,
  ViajeEstatusDto,
  CajasEsperadasDto,
} from "../dto";

/**
 * Clase encargada de la lógica del dashboard de materia prima
 * Solo llamadas REST
 */
export class MateriaPrimaService implements IMateriaService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1`;
  }

  async getBoletasPlanta1(): Promise<ViajeProgramadoDto[]> {
    return api<ViajeProgramadoDto[]>(
      `${this.url}/materia-prima-planta-1/registro-agronomos`
    );
  }

  async getEstatusPlanta1(): Promise<ViajeEstatusDto[]> {
    return api<ViajeEstatusDto[]>(
      `${this.url}/materia-prima-planta-1/estatus`
    );
  }

  async getCajasPlanta1(): Promise<CajasEsperadasDto[]> {
    return api<CajasEsperadasDto[]>(
      `${this.url}/materia-prima-planta-1/informacion-grafica-barras`
    );
  }


  async getBoletasPlanta3(): Promise<ViajeProgramadoDto[]> {
    return api<ViajeProgramadoDto[]>(
      `${this.url}/materia-prima-planta-1/registro-agronomos?factory=2`
    );
  }

  async getEstatusPlanta3(): Promise<ViajeEstatusDto[]> {
    return api<ViajeEstatusDto[]>(
      `${this.url}/materia-prima-planta-3/estatus`
    );
  }

  async getCajasPlanta3(): Promise<CajasEsperadasDto[]> {
    return api<CajasEsperadasDto[]>(
      `${this.url}/materia-prima-planta-3/informacion-grafica-barras`
    );
  }
}