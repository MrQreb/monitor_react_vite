import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { TiempoMuertoDto }
  from "../../../api/dto/tiempo-muerto-dto";

import { TiempoMuertoHub }
  from "../../../api/socket/hub/tiempo-muerto-hub";

import type { EventPayload }
  from "@/core/singalR/interface/EventPayLoad";

import type {
  TiempoMuertoCreadoEvent,
  TiempoMuertoFinalizadoEvent,
} from "@/features/tiempos-muertos/api/socket/events";

/**
 * Mantiene sincronizada la cache de React Query
 * con los eventos recibidos desde SignalR.
 *
 * La carga inicial se obtiene mediante REST.
 * Posteriormente, cualquier cambio recibido
 * por SignalR actualiza directamente la cache
 * utilizando `queryClient.setQueryData`,
 * evitando realizar nuevas peticiones HTTP.
 *
 * El hook puede trabajar en dos modos:
 *
 * - Global:
 *   Sincroniza los tiempos muertos de todas
 *   las áreas.
 *
 * - Filtrado:
 *   Sincroniza únicamente los tiempos muertos
 *   pertenecientes al área indicada.
 *
 * @param areaId
 * Identificador del área que debe sincronizarse.
 *
 * Si es `undefined`, se procesarán eventos
 * de todas las áreas.
 *
 * @param queryKey
 * Clave principal de React Query utilizada
 * para actualizar la cache correspondiente.
 *
 * @param enabled
 * Indica si la suscripción al Hub debe activarse.
 *
 * Generalmente se habilita después de que la
 * carga inicial por REST haya finalizado
 * correctamente.
 */
export function useTiempoMuertoRealtime(
  areaId: number | undefined,
  queryKey: string,
  enabled: boolean,
) {

  /** Cliente de React Query. */
  const queryClient = useQueryClient();

  /**
   * Clave real utilizada para actualizar
   * la cache.
   *
   * Ejemplos:
   *
   * Global:
   * ["tiempos-muertos"]
   *
   * Por área:
   * ["tiempos-muertos-iqf", 2]
   */
  const cacheKey =
    areaId === undefined
      ? [queryKey]
      : [queryKey, areaId];

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const hub =
      TiempoMuertoHub.getInstance();

    void hub.start();

    /**
     * Procesa eventos de creación.
     *
     * Inserta los nuevos registros en cache
     * y evita duplicados utilizando el id
     * de máquina.
     */
    const handleCreated = (
      payload: EventPayload<TiempoMuertoCreadoEvent>,
    ) => {

      const nuevos =
        Array.isArray(payload)
          ? payload
          : [payload];

      /**
       * Si no existe área configurada,
       * procesa todos los eventos.
       */
      const eventosArea =
        areaId === undefined
          ? nuevos
          : nuevos.filter(
            x => x.areaId === areaId,
          );

      if (eventosArea.length === 0) {
        return;
      }

      queryClient.setQueryData(
        cacheKey,
        (
          actuales: TiempoMuertoDto[] = [],
        ) => {

          const ids =
            new Set(
              eventosArea.map(
                x => x.maquinaId,
              ),
            );

          return [
            ...eventosArea,
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
     * Procesa eventos de finalización.
     *
     * Elimina de cache los registros
     * correspondientes a las máquinas
     * finalizadas.
     */
    const handleFinished = (
      payload: EventPayload<TiempoMuertoFinalizadoEvent>,
    ) => {

      const finalizados =
        Array.isArray(payload)
          ? payload
          : [payload];

      /**
       * Si no existe área configurada,
       * procesa todos los eventos.
       */
      const eventosArea =
        areaId === undefined
          ? finalizados
          : finalizados.filter(
            x => x.areaId === areaId,
          );

      if (eventosArea.length === 0) {
        return;
      }

      const ids =
        new Set(
          eventosArea.map(
            x => x.maquinaId,
          ),
        );

      queryClient.setQueryData(
        cacheKey,
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

  }, [
    areaId,
    cacheKey,
    enabled,
    queryClient,
  ]);
}