import type { ConnectionListener }
from "./connection-listener.type";

/**
 * Contrato base para clientes SignalR.
 *
 * Encapsula la comunicación en tiempo real
 * con cualquier Hub de la aplicación.
 *
 * @template Events
 * Mapa de eventos y payloads.
 */
export interface ISignalRClient<Events> {

  /**
   * Inicia la conexión con el Hub.
   */
  start(): Promise<void>;

  /**
   * Indica si actualmente existe una
   * conexión activa.
   */
  isConnected(): boolean;

  /**
   * Permite escuchar cambios de conexión.
   *
   * @returns Función para cancelar la suscripción.
   */
  subscribeConnection(
    callback: ConnectionListener,
  ): () => void;

  /**
   * Registra un listener para un evento.
   */
  on<K extends keyof Events>(
    event: K,
    callback: (payload: Events[K]) => void,
  ): void;

  /**
   * Elimina un listener previamente registrado.
   */
  off<K extends keyof Events>(
    event: K,
    callback: (payload: Events[K]) => void,
  ): void;
}