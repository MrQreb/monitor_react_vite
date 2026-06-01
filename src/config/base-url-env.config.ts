/**
 * Url base la variable de entorno para la api del monitor
 * @returns string - url base de la api
 */
export const baseUrl = import.meta.env.VITE_API_URL;

/** Url base de API REST */
export const baseUrlMonitor = import.meta.env.VITE_API_URL_MONITOR;

/** Url base de websocket */
export const baseUrlSocketMonitor = `${import.meta.env.VITE_API_URL_MONITOR}/ws`;