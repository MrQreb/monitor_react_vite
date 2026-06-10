import { materiaPrimaPlanta1CountService } from "@/features/materia-prima/api/planta1/instances/materiaPrimaInstancesService.instance";
import type { RangoFechasMateriaPrimaDto } from "@/features/materia-prima/api/shared";
import { useQuery } from "@tanstack/react-query";

interface Props {
    rangoFechasMateriaPrimaDto?: RangoFechasMateriaPrimaDto;
}

export function useMateriaPrimaResumen(
    { rangoFechasMateriaPrimaDto }: Props = {}
) {
    return useQuery({
        queryKey: [
            "resumen-materia-prima-planta-1",
            rangoFechasMateriaPrimaDto
        ],
        queryFn: async () =>
            await materiaPrimaPlanta1CountService.getResumenMateriaPrima(
                rangoFechasMateriaPrimaDto
            ),
    });
}