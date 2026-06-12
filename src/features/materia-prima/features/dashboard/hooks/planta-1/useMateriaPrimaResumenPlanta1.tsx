import { materiaPrimaPlanta1CountService } from "@/features/materia-prima/api/planta1/instances/materiaPrimaPlanta1Count.instance";
import type { RangoFechasMateriaPrimaDto } from "@/features/materia-prima/api/shared";
import { useQuery } from "@tanstack/react-query";

interface Props {
    rangoFechasMateriaPrimaDto?: RangoFechasMateriaPrimaDto;
}

/** Devuelve las cajas estimadas, reales y el producto de la materia prima de planta 1
 * @param rangoFechasMateriaPrimaDto
 * @returns query
  */
export function useMateriaPrimaResumenPlanta1(
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