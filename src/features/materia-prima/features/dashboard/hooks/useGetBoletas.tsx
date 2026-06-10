import { materiaPrimaPlanta1QueryService } from "@/features/materia-prima/api/queries/instances/materiaPrimaQueryService.instance";
import type { QueryBoletasPlanta } from "@/features/materia-prima/api/shared/queries/queryBoletasPlanta.query";
import { useQuery } from "@tanstack/react-query";

export const useGetBoletas = (
  dataQuery: QueryBoletasPlanta,
) => {
  return useQuery({
    queryKey: ["estatus-boletas-planta-1", dataQuery],
    queryFn: () => materiaPrimaPlanta1QueryService.executeQueryBoletasAsync(dataQuery),
    enabled: !!dataQuery,
  });
};
