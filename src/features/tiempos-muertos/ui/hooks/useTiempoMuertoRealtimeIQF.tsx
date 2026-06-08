import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { TiempoMuertoIQFHub }
from "../../api/socket/hub/tiempo-muerto-hub-iqf";

import { TIEMPOS_MUERTOS_IQF_KEY }
from "./useTiempoMuertoByAreaIdQuery";

import type { TiempoMuertoDto } from "../../api/dto/tiempo-muerto-dto";

/**
 * Sincroniza el cache de React Query
 * con los eventos recibidos desde SignalR.
 *
 * @param areaId
 * Área a la que pertenece la consulta.
 *
 * @param enabled
 * Indica si la suscripción debe activarse.
 */
export function useTiempoMuertoRealtimeIQF(
  areaId: number,
  enabled: boolean,
) {

  const queryClient =
    useQueryClient();

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const hub =
      TiempoMuertoIQFHub.getInstance();

    void hub.start();

    const handleCreated = (
      payload: any,
    ) => {

      const nuevos =
        Array.isArray(payload)
          ? payload
          : [payload];

      queryClient.setQueryData(
        TIEMPOS_MUERTOS_IQF_KEY(areaId),
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
        TIEMPOS_MUERTOS_IQF_KEY(areaId),
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
      "tiempo-muerto:iqf-creado",
      handleCreated,
    );

    hub.on(
      "tiempo-muerto:iqf-finalizado",
      handleFinished,
    );

    return () => {

      hub.off(
        "tiempo-muerto:iqf-creado",
        handleCreated,
      );

      hub.off(
        "tiempo-muerto:iqf-finalizado",
        handleFinished,
      );
    };

  }, [
    areaId,
    enabled,
    queryClient,
  ]);
}