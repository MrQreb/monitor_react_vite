import { useEffect, useState } from "react";
import { formatElapsedTime, getStatus } from "./card-paro-utils";

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