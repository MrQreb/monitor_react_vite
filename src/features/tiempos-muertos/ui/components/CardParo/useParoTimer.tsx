import { useEffect, useState } from "react";
import { formatElapsedTime, getStatus } from "./card-paro-utils";

/**
 * Calcula y actualiza en tiempo real la duración de un paro.
 *
 * A partir de la fecha de inicio, el hook mantiene un contador
 * en segundos que se actualiza cada segundo y expone información
 * derivada para la interfaz:
 *
 * @param fechaInicioParo Fecha y hora de inicio del paro en formato ISO.
 * @returns Objeto con la información calculada del paro.
 *
 * @example
 * const { elapsedSeconds, status, timeText } =
 *     useParoTimer("2026-06-06T09:06:13");
 *
 * console.log(elapsedSeconds); // 125
 * console.log(status);         // "normal"
 * console.log(timeText);       // "00:02:05"
 */
export function useParoTimer(fechaInicioParo: string) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        const inicioEpoch = Date.parse(fechaInicioParo);

        const updateElapsed = () => {
            const elapsed = Math.floor(
                (Date.now() - inicioEpoch) / 1000
            );

            setElapsedSeconds(elapsed);
        };

        updateElapsed();

        const interval = setInterval(updateElapsed, 1000);

        return () => clearInterval(interval);
    }, [fechaInicioParo]);

    return {
        elapsedSeconds,
        status: getStatus(elapsedSeconds),
        timeText: formatElapsedTime(elapsedSeconds),
    };
}