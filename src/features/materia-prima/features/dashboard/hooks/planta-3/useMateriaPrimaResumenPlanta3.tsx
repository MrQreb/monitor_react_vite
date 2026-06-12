import { materiaPrimaPlanta3CountService } from "@/features/materia-prima/api/planta3/instances/materiaPrimaPlanta3CountService.instance";
import type { RangoFechasMateriaPrimaDto } from "@/features/materia-prima/api/shared";
import { useQuery } from "@tanstack/react-query";

interface Props {
    rangoFechasMateriaPrimaDto?: RangoFechasMateriaPrimaDto;
}

/** Devuelve las cajas estimadas, reales y el producto de la materia prima de planta 1
 * @param rangoFechasMateriaPrimaDto
 * @returns query
  */
export function useMateriaPrimaResumenPlanta3(
    { rangoFechasMateriaPrimaDto }: Props = {}
) {
    return useQuery({
        queryKey: [
            "resumen-materia-prima-planta-3",
            rangoFechasMateriaPrimaDto
        ],
        queryFn: async () =>
            await materiaPrimaPlanta3CountService.getResumenMateriaPrima(
                rangoFechasMateriaPrimaDto
            ),
    });
}