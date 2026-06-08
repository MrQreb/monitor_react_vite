import { SignalRClient } from "@/core/singalR/services/signalr-client";
import { baseUrlSocketMonitorASP } from "@/config/base-url-env.config";
import type { TiempoMuertoIQFEvents } from "../events/tiempo-muerto-events-iqf";

/**
 * Wrapper del Hub de tiempos muertos.
 *
 * Centraliza la configuración
 * del endpoint SignalR.
 */
export class TiempoMuertoIQFHub {

  private static instance:
    SignalRClient<TiempoMuertoIQFEvents>;

  /**
   * Obtiene la instancia única.
   */
  static getInstance() {

    if (!this.instance) {

      //Url base del socket de tiempo muerto
      this.instance =  new SignalRClient<TiempoMuertoIQFEvents>(
          `${baseUrlSocketMonitorASP}/tiempo-muerto`,
      );
    }

    return this.instance;
  }
}