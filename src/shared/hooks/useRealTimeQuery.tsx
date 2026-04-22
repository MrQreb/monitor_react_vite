import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Props necesarias para el hook useRealtimeQuery.
 *
 * @template T Tipo de dato que retorna la query y recibe el WebSocket
 */
type UseRealtimeQueryProps<T> = {
  /**
   * Clave única de React Query para identificar y cachear los datos.
   * Debe ser estable y serializable.
   *
   * @example ["estatus", "planta1"]
   */
  queryKey: any[];

  /**
   * Función que obtiene los datos iniciales desde una API (REST).
   * Se ejecuta automáticamente por React Query.
   *
   * @returns {Promise<T>} Datos iniciales
   */
  queryFn: () => Promise<T>;

  /**
   * Función que suscribe a un evento en tiempo real (WebSocket).
   *
   * Recibe un callback que será ejecutado cuando lleguen nuevos datos.
   * Debe retornar una función de limpieza (unsubscribe).
   *
   * @param {(data: T) => void} cb Callback con los datos recibidos
   * @returns {() => void} Función para cancelar la suscripción
   */
  subscribe: (cb: (data: T) => void) => () => void;
};

/**
 * Hook genérico para manejar datos en tiempo real combinando:
 *
 * - React Query (fetch inicial + cache)
 * - WebSockets (actualización en tiempo real)
 *
 * Este hook:
 * 1. Obtiene los datos iniciales mediante `queryFn`
 * 2. Se suscribe a un evento WebSocket
 * 3. Actualiza automáticamente el cache cuando llegan nuevos datos
 *
 * @template T Tipo de datos manejados por la query
 *
 * @param {UseRealtimeQueryProps<T>} props Configuración del hook
 *
 * @returns Retorna el objeto de React Query (`data`, `isLoading`, `error`, etc.)
 *
 * @example
 * ```ts
 * const query = useRealtimeQuery({
 *   queryKey: ["estatus", "planta1"],
 *   queryFn: () => service.getEstatusPlanta1(),
 *   subscribe: socketService.onEstatusPlanta1,
 * });
 *
 * console.log(query.data);
 * ```
 *
 * @remarks
 * - Ideal para dashboards en tiempo real
 * - Mantiene sincronizado el cache de React Query con WebSockets
 * - Evita refetch manual innecesario
 * - Requiere que `subscribe` devuelva una función de limpieza
 */
export function useRealtimeQuery<T>({
  queryKey,
  queryFn,
  subscribe,
}: UseRealtimeQueryProps<T>) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn,
  });

  useEffect(() => {
    /**
     * Se suscribe al evento en tiempo real.
     * Cada vez que llegan nuevos datos, se actualiza el cache.
     */
    const unsubscribe = subscribe((data) => {
      queryClient.setQueryData(queryKey, data);
    });

    /**
     * Cleanup: elimina la suscripción al desmontar el componente
     */
    return unsubscribe;
  }, [queryClient, subscribe, queryKey]);

  return query;
}
