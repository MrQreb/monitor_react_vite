import { SignalRClient } from "@/core/singalR/services/signalr-client";
import { baseUrlSocketMonitorASP } from "@/config/base-url-env.config";
import type { TiempoMuertoEmbolsadoEvents } from "../events/tiempo-muerto-events-embolsado";

/**
 * Wrapper del Hub de tiempos muertos.
 *
 * Centraliza la configuración
 * del endpoint SignalR.
 */
export class TiempoMuertoEmbolsadorasHub {

  private static instance:
    SignalRClient<TiempoMuertoEmbolsadoEvents>;

  /**
   * Obtiene la instancia única.
   */
  static getInstance() {

    if (!this.instance) {

      //Url base del socket de tiempo muerto
      this.instance =  new SignalRClient<TiempoMuertoEmbolsadoEvents>(
          `${baseUrlSocketMonitorASP}/tiempo-muerto`,
      );
    }

    return this.instance;
  }
}