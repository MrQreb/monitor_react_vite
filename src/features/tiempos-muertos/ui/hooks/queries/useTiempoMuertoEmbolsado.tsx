import { AreasTiempoMuertoEnum } from "@/features/tiempos-muertos/api/enums/areas-tiempo-muerto.enum";
import { useTiempoMuertoByAreaIdQuery } from "./useTiempoMuertoByAreaIdQuery";
import { useTiempoMuertoRealtimeEmbolsadoras } from "../sockets/useTiempoMuertoRealtimeEmbolsadoras";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_EMBOLSADO_KEY = "tiempos-muertos-embolsado";

export function useTiempoMuertoEmbolsado() {


  //Llama query en base al area id
  const query = useTiempoMuertoByAreaIdQuery(AreasTiempoMuertoEnum.Embolsado, TIEMPOS_MUERTOS_EMBOLSADO_KEY);

  //Refresca la data atravez de web sockets
  useTiempoMuertoRealtimeEmbolsadoras(
    AreasTiempoMuertoEnum.Embolsado,
    query.isSuccess,
  );

  return query;
}