import { AreasTiempoMuertoEnum } from "@/features/tiempos-muertos/api/enums/areas-tiempo-muerto.enum";
import { useTiempoMuertoByAreaIdQuery } from "./useTiempoMuertoByAreaIdQuery";
import { useTiempoMuertoRealtime } from "../sockets/useTiempoMuertoRealtime";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_CORTE_KEY = "tiempos-muertos-corte";

export function useTiempoMuertoCorte() {

  const query = useTiempoMuertoByAreaIdQuery(
    AreasTiempoMuertoEnum.Corte,
    TIEMPOS_MUERTOS_CORTE_KEY,
  );

  useTiempoMuertoRealtime(
    AreasTiempoMuertoEnum.Corte,
    TIEMPOS_MUERTOS_CORTE_KEY,
    query.isSuccess,
  );

  return query;
}