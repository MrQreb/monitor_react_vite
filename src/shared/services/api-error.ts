/**
 * Representa un error proveniente de la API.
 * Extiende la clase nativa Error para incluir información adicional.
 * 
 * @template T Tipo opcional de datos adicionales del error.
 */
export class ApiError<T = unknown> extends Error {
  /**
   * Código de estado HTTP asociado al error.
   */
  public readonly status: number;

  /**
   * Datos adicionales del error (opcional).
   */
  public readonly data?: T;

  /**
   * Crea una nueva instancia de ApiError.
   * 
   * @param message Mensaje descriptivo del error.
   * @param status Código de estado HTTP.
   * @param data Datos adicionales opcionales.
   */
  constructor(message: string, status: number, data?: T) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;

    // Mantiene correctamente la cadena de prototipos (importante en TS/JS)
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Crea una instancia de ApiError de forma estática.
   * 
   * @param message Mensaje del error.
   * @param status Código HTTP.
   * @param data Datos adicionales opcionales.
   * @returns Instancia de ApiError.
   */
  static create<T = unknown>(
    message: string,
    status: number,
    data?: T
  ): ApiError<T> {
    return new ApiError(message, status, data);
  }

  /**
   * Verifica si un objeto es una instancia de ApiError.
   * 
   * @param error Objeto a evaluar.
   * @returns True si es ApiError, false en caso contrario.
   */
  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  /**
   * Obtiene un mensaje legible a partir de cualquier tipo de error.
   * 
   * @param error Error desconocido.
   * @returns Mensaje de error amigable.
   */
  static getMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Error inesperado";
  }
}