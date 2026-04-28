import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { conservadorService, conservadorWsService } from "../../api/instances/carry-over-instances";

/** Custoom hook que permite carga inical y del socket de carry over de planta 3 */
export const useCarryOverPlanta3 = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-conservador-carry-over"],
        queryFn: () => conservadorService.getCarryOverPlata3(),
        subscribe: conservadorWsService.onCarryOverPlanta3
    });


/** Custoom hook que permite carga inical y del socket de carry over en cajas de planta 3 */
export const useCarryOverCajasPlanta3 = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-conservador-carry-over-cajas"],
        queryFn: () => conservadorService.getCarryOverCajasPlanta3(),
        subscribe: conservadorWsService.onCarryOverCajasPlanta3
    });


/** Custoom hook que permite carga inical y del socket de carry over de planta 1 */
export const useCarryOverPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["planta-1-conservador-carry-over"],
        queryFn: async () => {
            return await conservadorService.getCarryOverPlata1();
             
        },
        subscribe: (cb) =>
            conservadorWsService.onCarryOverPlanta1((data) => {
                cb(data);
            }),
    });;