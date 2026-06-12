import { useQuery } from "@tanstack/react-query";
import type { RangoFechasMateriaPrimaDto } from "../../../../api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import { materiaPrimaPlanta1CountService } from "../../../../api/planta1/instances/materiaPrimaPlanta1Count.instance";

interface Props {
    rangoFechasMateriaPrimaDto?: RangoFechasMateriaPrimaDto;
}

/** Devuelve el conteo de las boletas por rango de fechas
 * @param rangoFechasMateriaPrimaDto
 * @returns query
 */
export function useBoletasCountPlanta1(
    { rangoFechasMateriaPrimaDto }: Props = {}
) {
    return useQuery({
        queryKey: [
            "conteo-boletas-planta-1",
            rangoFechasMateriaPrimaDto
        ],
        queryFn: async () =>
            await materiaPrimaPlanta1CountService.getBoletas(
                rangoFechasMateriaPrimaDto
            ),
    });
}