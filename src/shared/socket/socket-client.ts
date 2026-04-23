import { baseUrl } from "@/config/base-url-env.config";
import { io, Socket } from "socket.io-client";

/**
 * Cliente WebSocket basado en Socket.IO con patrón Singleton.
 *
 * @example
 * ```ts
 * interface MyEvents {
 *   "user:created": { id: string; name: string };
 * }
 *
 * const socket = SocketClient.getInstance<MyEvents>();
 *
 * socket.on("user:created", (data) => {
 *   console.log(data.name); // tipado correctamente
 * });
 * ```
 *
 * @remarks
 * - Implementa patrón Singleton → evita múltiples conexiones WebSocket
 * - Usa `transports: ["websocket"]` para forzar WebSocket (evita polling)
 * - La URL se obtiene desde `VITE_SOCKET_URL`
 */
export class SocketClient<Events extends Record<string, any>> {
  
    /** Instancia única del cliente (Singleton) */
  private static instance: SocketClient<any>;

  /** Instancia interna de Socket.IO */
  private socket: Socket;

  /**
   * Constructor privado para evitar múltiples instancias.
   * Usa `getInstance()` para obtener el cliente.
   */
  private constructor() {
    const URL = baseUrl;

    this.socket = io(URL, {
      autoConnect: true,
      transports: ["websocket"],
    });
  }

  /**
   * Obtiene la instancia única del cliente Socket.
   *
   * @template T Mapa de eventos a tipar
   * @returns {SocketClient<T>} Instancia singleton tipada
   *
   * @example
   * ```ts
   * const socket = SocketClient.getInstance<MyEvents>();
   * ```
   */
  static getInstance<T extends Record<string, any>>() {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient<T>();
    }
    return SocketClient.instance as SocketClient<T>;
  }

  /**
   * Suscribe un listener a un evento del socket.
   *
   * @template K Nombre del evento
   * @param {K} event Nombre del evento definido en el EventMap
   * @param {(data: Events[K]) => void} callback Función que se ejecuta al recibir el evento
   *
   * @example
   * ```ts
   * socket.on("dashboard:update", (data) => {
   *   console.log(data);
   * });
   * ```
   */
  on<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
    this.socket.on(event as string, callback);
  }

  /**
   * Elimina un listener previamente registrado.
   *
   * @template K Nombre del evento
   * @param {K} event Nombre del evento
   * @param {(data: Events[K]) => void} callback Referencia del callback a remover
   *
   * @example
   * ```ts
   * socket.off("dashboard:update", handler);
   * ```
   */
  off<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
    this.socket.off(event as string, callback);
  }

  /**
   * Emite un evento al servidor con su payload tipado.
   *
   * @template K Nombre del evento
   * @param {K} event Nombre del evento
   * @param {Events[K]} data Datos enviados al servidor
   *
   * @example
   * ```ts
   * socket.emit("user:create", { name: "Juan" });
   * ```
   */
  emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.socket.emit(event as string, data);
  }

  /**
   * Cierra la conexión del socket manualmente.
   *
   * @example
   * ```ts
   * socket.disconnect();
   * ```
   *
   * @remarks
   * Normalmente no es necesario llamarlo manualmente si usas
   * un patrón global o controlado por la app.
   */
  disconnect() {
    this.socket.disconnect();
  }
}