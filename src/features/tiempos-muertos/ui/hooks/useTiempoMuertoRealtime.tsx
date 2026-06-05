import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { TiempoMuertoDto }
from "../../api/dto/tiempo-muerto-dto";

import { TIEMPOS_MUERTOS_KEY }
from "./useTiempoMuertoQuery";
import { TiempoMuertoHub } from "../../api/socket/hub/tiempo-muerto-hub";



/**
 * Sincroniza el cache de React Query
 * con los eventos recibidos desde SignalR.
 *
 * @param enabled
 * Indica si la suscripción debe activarse.
 */
export function useTiempoMuertoRealtime(
  enabled: boolean,
) {

  const queryClient =
    useQueryClient();

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const hub = TiempoMuertoHub.getInstance();

    void hub.start();

    const handleCreated = (
      payload: any,
    ) => {

      const nuevos =
        Array.isArray(payload)
          ? payload
          : [payload];

      queryClient.setQueryData(
        TIEMPOS_MUERTOS_KEY,
        (
          actuales:
            TiempoMuertoDto[] = [],
        ) => {

          const ids =
            new Set(
              nuevos.map(
                x =>
                  x.maquinaId ??
                  x.MaquinaId,
              ),
            );

          return [
            ...nuevos,
            ...actuales.filter(
              x =>
                !ids.has(
                  x.maquinaId,
                ),
            ),
          ];
        },
      );
    };

    const handleFinished = (
      payload: any,
    ) => {

      const finalizados =
        Array.isArray(payload)
          ? payload
          : [payload];

      const ids =
        new Set(
          finalizados.map(
            x =>
              x.maquinaId ??
              x.MaquinaId,
          ),
        );

      queryClient.setQueryData(
        TIEMPOS_MUERTOS_KEY,
        (
          actuales:
            TiempoMuertoDto[] = [],
        ) =>
          actuales.filter(
            x =>
              !ids.has(
                x.maquinaId,
              ),
          ),
      );
    };

    hub.on(
      "tiempo-muerto:creado",
      handleCreated,
    );

    hub.on(
      "tiempo-muerto:finalizado",
      handleFinished,
    );

    return () => {

      hub.off(
        "tiempo-muerto:creado",
        handleCreated,
      );

      hub.off(
        "tiempo-muerto:finalizado",
        handleFinished,
      );
    };

  }, [enabled, queryClient]);
}