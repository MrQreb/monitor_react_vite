import { useEffect, useState } from "react";
import type { ISignalRClient } from "../interface/i-signalr-client";



/**
 * Hook que expone el estado actual
 * de una conexión SignalR.
 *
 * @param client
 * Cliente SignalR a monitorear.
 */
export function useSignalRConnection(
  client: ISignalRClient<any>,
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