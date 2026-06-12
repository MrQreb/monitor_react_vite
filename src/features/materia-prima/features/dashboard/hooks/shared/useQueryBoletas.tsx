import type { QueryBoletasPlanta } from "@/features/materia-prima/api/shared/dto/queryBoletasPlanta.dto";
import { materiaPrimaQueriesService } from "@/features/materia-prima/api/shared/queries/instances/materiaPrimaQueryService.instance";
import { useQuery } from "@tanstack/react-query";


/** Query compartido de las cajas de boletas de las plantas
 * @returns useQuery
 */
export const useQueryBoletas = (
  dataQuery: QueryBoletasPlanta,
) => {
  return useQuery({
    queryKey: ["estatus-boletas-planta-1", dataQuery],
    queryFn: () => materiaPrimaQueriesService.executeQueryBoletasAsync(dataQuery),
    enabled: !!dataQuery,
  });
};
