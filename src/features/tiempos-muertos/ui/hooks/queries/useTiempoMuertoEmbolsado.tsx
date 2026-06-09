import { AreasTiempoMuertoEnum } from "@/features/tiempos-muertos/api/enums/areas-tiempo-muerto.enum";
import { useTiempoMuertoByAreaIdQuery } from "./useTiempoMuertoByAreaIdQuery";
import { useTiempoMuertoRealtime } from "../sockets/useTiempoMuertoRealtime";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_EMBOLSADO_KEY = "tiempos-muertos-embolsado";

export function useTiempoMuertoEmbolsado() {

  const query = useTiempoMuertoByAreaIdQuery(
    AreasTiempoMuertoEnum.Embolsado,
    TIEMPOS_MUERTOS_EMBOLSADO_KEY,
  );

  useTiempoMuertoRealtime(
    AreasTiempoMuertoEnum.Embolsado,
    TIEMPOS_MUERTOS_EMBOLSADO_KEY,
    query.isSuccess,
  );

  return query;
}