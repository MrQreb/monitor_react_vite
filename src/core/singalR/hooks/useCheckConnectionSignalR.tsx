import { useEffect, useState } from "react";

import type { ISignalRClient }
from "../interface/i-signalr-client";

/**
 * Expone el estado actual de conexión
 * de un cliente SignalR.
 *
 * @param client
 * Cliente SignalR a monitorear.
 * @example
 *    const hub = TiempoMuertoHub.getInstance(); => //instancia del evento que llaman
 *    const connected = useSignalRConnection(hub); => //hook para ver la conexion
 */
export function useSignalRConnection<
  Events
>(
  client: ISignalRClient<Events>,
) {

  const [connected, setConnected] =
    useState(
      client.isConnected()
    );

  useEffect(() => {

    return client.subscribeConnection(
      setConnected,
    );

  }, [client]);

  return connected;
}