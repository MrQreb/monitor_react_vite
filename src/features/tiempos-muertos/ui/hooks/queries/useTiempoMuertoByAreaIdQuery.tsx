import { tiempoMuertoService } from "@/features/tiempos-muertos/api/module/instances/instances";
import { useQuery } from "@tanstack/react-query";

/**
 * Query reutilizable para los tiempos muertos por area
 * Query principal de tiempos muertos activos por una area id.
 *
 * Obtiene la carga inicial por REST y posteriormente
 * mantiene la información sincronizada mediante SignalR.
 * 
 * @param idArea -  Id  del area de los tiempos muertos
 * @param queryKey -  Nombre de key para refrescar
 * @returns UseQueryResult<TiempoMuertoDto[], Error>
 */

export function useTiempoMuertoByAreaIdQuery(
  idArea: number,
  queryKey: string
) {

  const query = useQuery({
    queryKey: [queryKey, idArea],
    queryFn: () => tiempoMuertoService.getTiemposCursoByAreaIdAsync(idArea),
  });

  return query;
}