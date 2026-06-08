import { useQuery } from "@tanstack/react-query";

import { tiempoMuertoService }
  from "../../api/module/instances/instances";

import { useTiempoMuertoRealtimeIQF } from "./useTiempoMuertoRealtimeIQF";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_IQF_KEY = (
  areaId: number,
) => ["tiempos-muertos-IQF", areaId] as const;

export function useTiempoMuertoByAreaIdQuery(
  idArea: number,
) {

  const query = useQuery({
    queryKey: TIEMPOS_MUERTOS_IQF_KEY(idArea),
    queryFn: () =>
      tiempoMuertoService.getTiemposCursoByAreaIdAsync(idArea),
  });

  useTiempoMuertoRealtimeIQF(
    idArea,
    query.isSuccess,
  );

  return query;
}