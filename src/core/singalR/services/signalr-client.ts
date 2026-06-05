import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import type { ISignalRClient } from "../interface/i-signalr-client";
import type { ConnectionListener } from "../interface/connection-listener.type";



/**
 * Cliente genérico para comunicación
 * mediante SignalR.
 *
 * Puede ser reutilizado por cualquier
 * módulo de la aplicación.
 *
 * @template Events
 * Mapa de eventos del Hub.
 */
export class SignalRClient<Events>
  implements ISignalRClient<Events> {

  /**
   * Conexión SignalR.
   */
  private readonly connection: HubConnection;

  /**
   * Observadores del estado de conexión.
   */
  private readonly listeners = new Set<ConnectionListener>();

  /**
   * URL del Hub.
   */
  private readonly hubUrl: string;

  /**
   * Inicializa la conexión.
   *
   * @param hubUrl
   * URL del Hub.
   */
  constructor(
    hubUrl: string,
  ) {
    this.hubUrl = hubUrl;

    this.connection =
      new HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

    this.registerConnectionEvents();
  }

  /**
   * Registra eventos internos
   * de conexión.
   */
  private registerConnectionEvents(): void {

    this.connection.onclose(() => {
      this.notifyConnectionListeners();
    });

    this.connection.onreconnecting(() => {
      this.notifyConnectionListeners();
    });

    this.connection.onreconnected(() => {
      this.notifyConnectionListeners();
    });
  }

  /**
   * Notifica el estado actual
   * de la conexión.
   */
  private notifyConnectionListeners(): void {

    const connected =
      this.isConnected();

    this.listeners.forEach(
      listener => listener(connected),
    );
  }

  /**
   * Inicia la conexión.
   */
  async start(): Promise<void> {

    if (this.isConnected()) {
      return;
    }

    await this.connection.start();

    this.notifyConnectionListeners();
  }

  /**
   * Verifica si existe conexión activa.
   */
  isConnected(): boolean {

    return (
      this.connection.state ===
      HubConnectionState.Connected
    );
  }

  /**
   * Escucha cambios de conexión.
   */
  subscribeConnection(
    callback: ConnectionListener,
  ): () => void {

    this.listeners.add(callback);

    callback(this.isConnected());

    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Registra un listener.
   */
  on<K extends keyof Events>(
    event: K,
    callback: (payload: Events[K]) => void,
  ): void {

    this.connection.on(
      event as string,
      callback as (...args: unknown[]) => void,
    );
  }

  /**
   * Elimina un listener.
   */
  off<K extends keyof Events>(
    event: K,
    callback: (payload: Events[K]) => void,
  ): void {

    this.connection.off(
      event as string,
      callback as (...args: unknown[]) => void,
    );
  }
}