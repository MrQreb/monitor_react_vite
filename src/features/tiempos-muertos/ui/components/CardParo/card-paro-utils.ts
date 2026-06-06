import type {
    ParoStatus,
} from "./card-paro.types";


/**
 * Determina el estado visual de un paro
 * según el tiempo transcurrido.
 *
 * Reglas:
 * - Menos de 5 minutos: normal.
 * - Entre 5 y 30 minutos: advertencia.
 * - Más de 30 minutos: crítico.
 *
 * @param elapsedSeconds Tiempo transcurrido en segundos.
 * @returns Estado calculado.
 */
export function getStatus(
    elapsedSeconds: number
): ParoStatus {
    if (elapsedSeconds < 300) {
        return "normal";
    }

    if (elapsedSeconds < 1800) {
        return "advertencia";
    }

    return "critico";
}

/**
 * Convierte segundos a formato HH:mm:ss.
 *
 * @example
 * formatElapsedTime(3661)
 * // "01:01:01"
 *
 * @param totalSeconds Tiempo total en segundos.
 * @returns Tiempo formateado.
 */
export function formatElapsedTime(
    totalSeconds: number
): string {
    const hours = Math.floor(
        totalSeconds / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map((v) =>
            String(v).padStart(2, "0")
        )
        .join(":");
}