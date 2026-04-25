import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tiempoMuertoWsService } from "../../api/instances/instances";
import { TIEMPOS_MUERTOS_QUERY_KEY } from "./useTiempoMuertoQuery";
import type { TiempoMuertoDto } from "../../api/dto/tiempo-muerto-dto";

/**
 * Realiza un merge de los paros actuales con los nuevos,
 * evitando duplicados basados en el `id`.
 *
 * - Los elementos entrantes (`incoming`) se priorizan y se colocan al inicio.
 * - Los elementos existentes (`old`) se mantienen solo si no existen en `incoming`.
 *
 * @param old - Lista actual de paros almacenados en caché.
 * @param incoming - Nuevos paros recibidos desde el WebSocket.
 * @returns Lista combinada sin duplicados.
 */
function mergeParos(
  old: TiempoMuertoDto[] = [],
  incoming: TiempoMuertoDto[]
): TiempoMuertoDto[] {
  return [
    ...incoming,
    ...old.filter((o) => !incoming.some((n) => n.id === o.id)),
  ];
}

/**
 * Elimina de la lista actual los paros que han sido finalizados.
 *
 * - Se construye un `Set` con los IDs de los paros finalizados.
 * - Se filtran los elementos actuales excluyendo los que coincidan con esos IDs.
 *
 * @param old - Lista actual de paros en caché.
 * @param incoming - Paros que han sido marcados como finalizados.
 * @returns Lista actualizada sin los paros finalizados.
 */
function removeParos(
  old: TiempoMuertoDto[] = [],
  incoming: TiempoMuertoDto[]
): TiempoMuertoDto[] {
  const ids = new Set(incoming.map((p) => p.id));
  return old.filter((p) => !ids.has(p.id));
}

/**
 * Hook que se suscribe a eventos de WebSocket relacionados con "tiempos muertos"
 * y mantiene sincronizada la caché de React Query en tiempo real.
 *
 * Escucha dos tipos de eventos:
 *
 * - `onEnCurso`: agrega o actualiza paros en curso.
 * - `onEnFinilizada`: elimina paros que han finalizado.
 *
 * Utiliza `queryClient.setQueryData` para actualizar de forma optimista
 * la caché asociada a `TIEMPOS_MUERTOS_QUERY_KEY`.
 *
 * @param enabled - Indica si la suscripción al WebSocket debe estar activa.
 *
 * @remarks
 * - Si `enabled` es `false`, no se establece ninguna suscripción.
 * - Se encarga automáticamente de limpiar las suscripciones al desmontar el componente.
 *
 * @example
 * ```ts
 * useTiempoMuertoSubscription(true);
 * ```
 */
export const useTiempoMuertoSubscription = (enabled: boolean): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    /**
     * Suscripción a eventos de paros en curso
     */
    const unsubscribeCreated = tiempoMuertoWsService.onEnCurso((data) => {
      const incoming = Array.isArray(data) ? data : [data];
      
      queryClient.setQueryData(
        TIEMPOS_MUERTOS_QUERY_KEY,
        (old: TiempoMuertoDto[] = []) => mergeParos(old, incoming)
      );
    });

    /**
     * Suscripción a eventos de paros finalizados
     */
    const unsubscribeFinished = tiempoMuertoWsService.onEnFinilizada((data) => {
      const incoming = Array.isArray(data) ? data : [data];

      queryClient.setQueryData(
        TIEMPOS_MUERTOS_QUERY_KEY,
        (old: TiempoMuertoDto[] = []) => removeParos(old, incoming)
      );
    });

    /**
     * Cleanup de suscripciones al desmontar o cambiar dependencias
     */
    return () => {
      unsubscribeCreated();
      unsubscribeFinished();
    };
  }, [enabled, queryClient]);
};