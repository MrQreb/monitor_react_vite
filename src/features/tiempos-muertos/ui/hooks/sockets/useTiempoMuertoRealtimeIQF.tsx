import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { TiempoMuertoDto }
  from "../../../api/dto/tiempo-muerto-dto";

import type { EventPayload }
  from "@/core/singalR/interface/EventPayLoad";

import type { TiempoMuertoCreadoEvent }
  from "../../../api/socket/events/tiempo-muerto-creado-event";

import type { TiempoMuertoFinalizadoEvent }
  from "../../../api/socket/events/tiempo-muerto-finalizado-event";

import { TiempoMuertoIQFHub }
  from "../../../api/socket/hub/tiempo-muerto-hub-iqf";
import { TIEMPOS_MUERTOS_IQF_KEY } from "../queries/useTiempoMuertoIQF";



/**
 * Mantiene sincronizada la cache de React Query
 * con los eventos de tiempo real recibidos
 * desde SignalR para el área indicada.
 *
 * La carga inicial de datos se obtiene mediante
 * una consulta REST. Posteriormente, cualquier
 * cambio recibido desde SignalR actualiza
 * directamente la cache utilizando
 * `queryClient.setQueryData`, evitando
 * peticiones HTTP adicionales.
 
* @param areaId
 * Identificador del área asociada a la consulta.
 *
 * @param enabled
 * Indica si la suscripción al Hub debe activarse.
 * Generalmente se habilita después de obtener
 * correctamente la carga inicial de datos.
 */
export function useTiempoMuertoRealtimeIQF(
  areaId: number,
  enabled: boolean,
) {

  /** Cliente encargado de administrar la cache de React Query. */
  const queryClient = useQueryClient();

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const hub = TiempoMuertoIQFHub.getInstance();

    void hub.start();

    /**
     * Procesa los eventos de creación de tiempos muertos.
     *
     * Inserta los nuevos registros en la cache y evita
     * duplicados utilizando el identificador de máquina.
     *
     * Si existe un registro previo para la misma máquina,
     * este es reemplazado por el más reciente.
     */
    const handleCreated = (
      payload: EventPayload<TiempoMuertoCreadoEvent>,
    ) => {

      const nuevos =
        Array.isArray(payload)
          ? payload
          : [payload];

      queryClient.setQueryData(
        [TIEMPOS_MUERTOS_IQF_KEY, areaId],
        (
          actuales: TiempoMuertoDto[] = [],
        ) => {

          const ids = new Set(
            nuevos.map(
              x => x.maquinaId,
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

    /**
     * Procesa los eventos de finalización de tiempos muertos.
     *
     * Elimina de la cache todos los registros asociados
     * a las máquinas recibidas en el evento.
     */
    const handleFinished = (
      payload: EventPayload<TiempoMuertoFinalizadoEvent>,
    ) => {

      const finalizados =
        Array.isArray(payload)
          ? payload
          : [payload];

      const ids = new Set(
        finalizados.map(
          x => x.maquinaId,
        ),
      );

      queryClient.setQueryData(
        [TIEMPOS_MUERTOS_IQF_KEY, areaId],
        (
          actuales: TiempoMuertoDto[] = [],
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