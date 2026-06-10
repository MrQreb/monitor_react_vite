import { materiaPrimaPlanta1QueryService } from "@/features/materia-prima/api/queries/instances/materiaPrimaQueryService.instance";
import type { QueryCajas } from "@/features/materia-prima/api/shared/queries/queryCajas.query";
import { useQuery } from "@tanstack/react-query";

export const useQueryCajas = (
  dataQuery: QueryCajas,
) => {
  return useQuery({
    queryKey: ["comparativo-cajas", dataQuery],
    queryFn: () => materiaPrimaPlanta1QueryService.executeQueryCajasAsync(dataQuery),
    enabled: !!dataQuery,
  });
};
