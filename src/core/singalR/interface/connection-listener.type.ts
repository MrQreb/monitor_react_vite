/**
 * Callback utilizado para notificar cambios
 * en el estado de conexión de SignalR.
 *
 * @param connected
 * Indica si la conexión se encuentra activa.
 */
export type ConnectionListener = (
  connected: boolean
) => void;