import { materiaPrimaPlanta1QueryService } from "@/features/materia-prima/api/planta1/instances/materiaPrimaQueryService.instance";
import type { GetEstatusBoletasPlantaQuery } from "@/features/materia-prima/api/shared/queries/getEstatusBoletasPlanta.query";
import { useQuery } from "@tanstack/react-query";

export const useGetBoletas = (
  dataQuery: GetEstatusBoletasPlantaQuery,
) => {
  return useQuery({
    queryKey: ["estatus-boletas-planta-1", dataQuery],
    queryFn: () => materiaPrimaPlanta1QueryService.executeAsync(dataQuery),
    enabled: !!dataQuery,
  });
};
