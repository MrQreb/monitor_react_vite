import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { combustoleoService, combustoleoWsService } from "../../api/features/instances/combustoleo-instances";

/** Custoom hook que permite obtener las cajas reales y estimadas de los productos*/
export const useCombustoleoPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["planta-1-combustoleo"],
        queryFn: () => combustoleoService.getCombustoleoPlanta1(),
        subscribe: combustoleoWsService.onCombustoleoPlanta1,
    });


/** Custoom hook que permite obtener las cajas reales y estimadas de los productos*/
export const useCombustoleoPlanta3 = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-combustoleo"],
        queryFn: () => combustoleoService.getCombustoleoPlanta3(),
        subscribe: combustoleoWsService.onCombustoleoPlanta3,
    });