import { tiempoMuertoService } from "@/features/tiempos-muertos/api/module/instances/instances";
import { useQuery } from "@tanstack/react-query";
import { useTiempoMuertoRealtime } from "../sockets/useTiempoMuertoRealtime";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_KEY = "tiempos-muertos";


export function useTiempoMuertoQuery() {

  const query = useQuery({
    queryKey: [TIEMPOS_MUERTOS_KEY],
    queryFn: () =>
      tiempoMuertoService.getTiemposCursoAsync(),
  });

  /**
   * Sincroniza todos los tiempos muertos
   * sin filtrar por área.
   */
  useTiempoMuertoRealtime(
    undefined,
    TIEMPOS_MUERTOS_KEY,
    query.isSuccess,
  );

  return query;
}