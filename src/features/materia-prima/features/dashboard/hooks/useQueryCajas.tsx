import { useQuery } from "@tanstack/react-query";
import type { QueryCajas } from "@/features/materia-prima/api/shared/dto/queryCajas.dto";
import { materiaPrimaQueriesService } from "@/features/materia-prima/api/shared/queries/instances/materiaPrimaQueryService.instance";

/** Query compartido de las cajas de las plantas en base al dataQuery
 * @returns useQuery
 */
export const useQueryCajas = (
  dataQuery: QueryCajas,
) => {
  return useQuery({
    queryKey: ["comparativo-cajas", dataQuery],
    queryFn: () => materiaPrimaQueriesService.executeQueryCajasAsync(dataQuery),
    enabled: !!dataQuery,
  });
};
