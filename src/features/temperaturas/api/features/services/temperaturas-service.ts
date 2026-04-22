import { baseUrl } from "@/config/base-url-env.config";
import type { ITemperaturasService } from "../interfaces/i-temperaturas-service";
import type { TemperaturasDto, TemperaturasCedisDto } from "../dto";
import { api } from "@/shared/services/api";

/**
 * Clase encargada de la lógica llamas de las temperatuas
 * Solo llamadas REST
 */
export class TemeperaturasService implements ITemperaturasService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no está inicializada");
    }
    this.url = `${baseUrl}/api/v1`;
  }

  getTemperaturasPlanta1(): Promise<Partial<TemperaturasDto[]>> {
    return api<TemperaturasDto[]>(`${this.url}/temperaturas/planta-1`);
  }

  getTemperaturasTunel1Planta3(): Promise<Partial<TemperaturasDto[]>> {
    return api<TemperaturasDto[]>(`${this.url}/temperaturas/tunel-1-planta-3`);
  }
  getTemperaturasTunel2Planta3(): Promise<Partial<TemperaturasDto[]>> {
    return api<TemperaturasDto[]>(`${this.url}/temperaturas/tunel-2-planta-3`);
  }

  getTemperaturasCedis1(): Promise<Partial<TemperaturasCedisDto[]>> {
    return api<TemperaturasCedisDto[]>(
      `${this.url}/temperaturas/cedis-planta-3?tipoCedis=CEDIS%201`,
    );
  }

  getTemperaturasCedis2(): Promise<Partial<TemperaturasCedisDto[]>> {
    return api<TemperaturasCedisDto[]>(
      `${this.url}/temperaturas/cedis-planta-3?tipoCedis=CEDIS%202`,
    );
  }
}
