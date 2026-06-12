import { useQuery } from "@tanstack/react-query";
import type { RangoFechasMateriaPrimaDto } from "../../../../api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import { materiaPrimaPlanta3CountService } from "@/features/materia-prima/api/planta3/instances/materiaPrimaPlanta3CountService.instance";

interface Props {
    rangoFechasMateriaPrimaDto?: RangoFechasMateriaPrimaDto;
}

/** Devuelve el conteo de las boletas por rango de fechas
 * @param rangoFechasMateriaPrimaDto
 * @returns query
 */
export function useBoletasCountPlanta3(
    { rangoFechasMateriaPrimaDto }: Props = {}
) {
    return useQuery({
        queryKey: [
            "conteo-boletas-planta-3",
            rangoFechasMateriaPrimaDto
        ],
        queryFn: async () =>
            await materiaPrimaPlanta3CountService.getBoletas(
                rangoFechasMateriaPrimaDto
            ),
    });
}