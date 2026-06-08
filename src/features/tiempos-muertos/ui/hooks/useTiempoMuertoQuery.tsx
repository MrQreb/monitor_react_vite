import { useQuery } from "@tanstack/react-query";

import { tiempoMuertoService }
from "../../api/module/instances/instances";

import { useTiempoMuertoRealtime }
from "./useTiempoMuertoRealtime";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_KEY = [
  "tiempos-muertos",
] as const;

export function useTiempoMuertoQuery() {

  const query = useQuery({
    queryKey: TIEMPOS_MUERTOS_KEY,
    queryFn: () =>
      tiempoMuertoService.getTiemposCursoAsync(),
  });

  useTiempoMuertoRealtime(
    query.isSuccess
  );

  return query;
}