import { AreasTiempoMuertoEnum } from "@/features/tiempos-muertos/api/enums/areas-tiempo-muerto.enum";
import { useTiempoMuertoRealtimeIQF } from "../sockets/useTiempoMuertoRealtimeIQF";
import { useTiempoMuertoByAreaIdQuery } from "./useTiempoMuertoByAreaIdQuery";

/**
 * Query principal de tiempos muertos activos.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 */
export const TIEMPOS_MUERTOS_IQF_KEY = "tiempos-muertos-IQF";

export function useTiempoMuertoIQF() {


  //Llama query en base al area id
  const query = useTiempoMuertoByAreaIdQuery(AreasTiempoMuertoEnum.IQF, TIEMPOS_MUERTOS_IQF_KEY);

  //Refresca la data atravez de web sockets
  useTiempoMuertoRealtimeIQF(
    AreasTiempoMuertoEnum.IQF,
    query.isSuccess,
  );

  return query;
}