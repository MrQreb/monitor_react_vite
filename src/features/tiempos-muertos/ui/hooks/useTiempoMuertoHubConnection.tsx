import { useEffect, useState } from "react";
import { TiempoMuertoHubClient } from "../../api/socket/signalr/tiempo-muerto-hub-client";
import type { TiempoMuertoEvents } from "../../api/socket/events/tiempo-muerto-events";

/**
 * Hook de conectividad para el Hub (SignalR) de tiempos muertos.
 *
 * - Mantiene un booleano con el estado de conexión (`connected`).
 * - Arranca el Hub en background usando `ensureStarted()`.
 * - Se usa solo en esta feature para no afectar otros módulos que aún dependen de Socket.IO.
 *
 * @returns `true` si el Hub está conectado, `false` en caso contrario.
 */
export function useTiempoMuertoHubConnection(): boolean {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const hub = TiempoMuertoHubClient.getInstance<TiempoMuertoEvents>();

    // Arranca conexión en background
    void hub.ensureStarted().catch(() => {
      // el estado lo refleja `connected=false`
    });

    return hub.subscribeConnection(setConnected);
  }, []);

  return connected;
}
