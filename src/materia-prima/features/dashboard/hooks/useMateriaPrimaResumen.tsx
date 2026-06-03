import { useQuery } from "@tanstack/react-query";
import type { RangoFechasMateriaPrimaDto } from "../../../api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import { materiaPrimaPlanta1CountService } from "../../../api/planta1/instances/materiaPrimaInstancesService";

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