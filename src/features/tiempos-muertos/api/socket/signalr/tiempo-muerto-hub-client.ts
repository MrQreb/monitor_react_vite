import { baseUrlMonitor, baseUrlSocketMonitor } from "@/config/base-url-env.config";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

type ConnectionListener = (connected: boolean) => void;

/**
 * Resuelve la URL del Hub de SignalR para "tiempos-muertos".
 *
 * Orden de prioridad:
 * 1) `VITE_TIEMPOS_MUERTOS_HUB_URL` (URL completa al hub)
 * 2) `${VITE_API_URL_MONITOR}/hubs/tiempos-muertos` (convención por defecto)
 *
 * @throws Error si no existe `VITE_API_URL_MONITOR` y tampoco `VITE_TIEMPOS_MUERTOS_HUB_URL`.
 *
 * @example
 * ```bash
 * # .env
 * VITE_API_URL_MONITOR=https://mi-backend
 * # o
 * VITE_TIEMPOS_MUERTOS_HUB_URL=https://mi-backend/hubs/tiempos-muertos
 * ```
 */
function getHubUrl(): string {
  const explicit = `${baseUrlSocketMonitor}/tiempo-muerto`;

  if (explicit) return explicit;

  if (!baseUrlMonitor) {
    throw new Error(
      "VITE_API_URL_MONITOR no está inicializada (baseUrlMonitor)"
    );
  }

  // Default convencional (puedes sobreescribir con VITE_TIEMPOS_MUERTOS_HUB_URL)
  return `${baseUrlMonitor}/hubs/tiempos-muertos`;
}

/**
 * Cliente SignalR (Hub) con patrón Singleton para la feature de tiempos muertos.
 *
 * Este wrapper provee una API parecida a `SocketClient` (on/off + estado conectado),
 * pero usando SignalR (ASP.NET Core).
 *
 * Características:
 * - Singleton: evita múltiples conexiones al Hub
 * - `withAutomaticReconnect()`: reconexión automática
 * - `ensureStarted()`: start lazy (no bloquea render)
 * - `subscribeConnection()`: notifica cambios de estado (connected / reconnecting / closed)
 *
 * @template Events Mapa de eventos del Hub (nombre → tipo del payload)
 *
 * @example
 * ```ts
 * import type { TiempoMuertoEvents } from "../events/tiempo-muerto-events";
 *
 * const hub = TiempoMuertoHubClient.getInstance<TiempoMuertoEvents>();
 * hub.on("tiempo-muerto:creado", (payload) => {
 *   console.log(payload);
 * });
 * ```
 */
export class TiempoMuertoHubClient<Events extends Record<string, any>> {
  private static instance: TiempoMuertoHubClient<any> | undefined;

  private readonly connection: HubConnection;
  private startPromise: Promise<void> | null = null;
  private readonly connectionListeners = new Set<ConnectionListener>();

  private constructor(hubUrl: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    this.connection.onclose(() => this.notifyConnectionListeners());
    this.connection.onreconnecting(() => this.notifyConnectionListeners());
    this.connection.onreconnected(() => this.notifyConnectionListeners());
  }

  static getInstance<T extends Record<string, any>>(): TiempoMuertoHubClient<T> {
    if (!TiempoMuertoHubClient.instance) {
      TiempoMuertoHubClient.instance = new TiempoMuertoHubClient<T>(getHubUrl());
    }

    return TiempoMuertoHubClient.instance as TiempoMuertoHubClient<T>;
  }

  /** `true` si la conexión SignalR está actualmente en estado Connected. */
  get connected(): boolean {
    return this.connection.state === HubConnectionState.Connected;
  }

  /**
   * Se suscribe a cambios de conectividad.
   *
   * @param listener Callback que recibe `true/false`
   * @returns función para desuscribirse
   */
  subscribeConnection(listener: ConnectionListener): () => void {
    this.connectionListeners.add(listener);
    listener(this.connected);

    return () => {
      this.connectionListeners.delete(listener);
    };
  }

  private notifyConnectionListeners() {
    const isConnected = this.connected;
    this.connectionListeners.forEach((listener) => listener(isConnected));
  }

  /**
   * Asegura que la conexión esté iniciada.
   *
   * - Si ya está conectada, no hace nada.
   * - Si está en proceso de conexión, reutiliza la misma promesa.
   *
   * @throws Propaga el error de `connection.start()` (para que el caller decida qué hacer).
   */
  async ensureStarted(): Promise<void> {
    if (this.connection.state === HubConnectionState.Connected) return;

    if (!this.startPromise) {
      this.startPromise = this.connection
        .start()
        .catch((error) => {
          // Limpia para permitir reintentos en el futuro
          this.startPromise = null;
          throw error;
        })
        .finally(() => {
          this.notifyConnectionListeners();
        });
    }

    return this.startPromise;
  }

  /**
   * Suscribe un handler a un evento del Hub.
   *
   * @remarks
   * SignalR soporta múltiples args por evento; este wrapper asume 1 payload.
   */
  on<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
    // Lazy start sin bloquear el render/hook
    void this.ensureStarted();

    this.connection.on(event as string, callback as (...args: any[]) => void);
  }

  /** Elimina un handler previamente registrado con `on()`. */
  off<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
    this.connection.off(event as string, callback as (...args: any[]) => void);
  }

  /**
   * Detiene la conexión.
   *
   * @remarks
   * No se suele llamar en un dashboard (porque queremos realtime),
   * pero se deja disponible para casos de cleanup manual.
   */
  async stop(): Promise<void> {
    this.startPromise = null;
    await this.connection.stop();
    this.notifyConnectionListeners();
  }
}
