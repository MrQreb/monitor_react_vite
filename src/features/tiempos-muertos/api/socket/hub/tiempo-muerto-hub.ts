import { SignalRClient } from "@/core/singalR/services/signalr-client";
import type { TiempoMuertoEvents } from "../events/tiempo-muerto-events";
import { baseUrlSocketMonitorASP } from "@/config/base-url-env.config";

/**
 * Wrapper del Hub de tiempos muertos.
 *
 * Centraliza la configuración
 * del endpoint SignalR.
 */
export class TiempoMuertoHub {

  private static instance:
    SignalRClient<TiempoMuertoEvents>;

  /**
   * Obtiene la instancia única.
   */
  static getInstance() {

    if (!this.instance) {

      this.instance =
        new SignalRClient<
          TiempoMuertoEvents
        >(
          `${baseUrlSocketMonitorASP}/tiempo-muerto`,
        );
    }

    return this.instance;
  }
}