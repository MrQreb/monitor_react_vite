/**
 * Url base la variable de entorno para la api del monitor
 * @returns string - url base de la api
 */

export const baseUrlRESTNest = import.meta.env.VITE_API_URL;

/** Url base de API de ASP Net REST */
export const baseUrlRESTMonitorASP = import.meta.env.VITE_API_URL_MONITOR;

/** Url base ASP Net de websocket */
export const baseUrlSocketMonitorASP = `${import.meta.env.VITE_API_URL_MONITOR}/ws`;