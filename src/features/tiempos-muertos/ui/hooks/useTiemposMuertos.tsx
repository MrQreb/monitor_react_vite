import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { tiempoMuertoService, tiempoMuertoWsService } from "../../api/instances/instances";

export const useTiemposMuertos = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-tiempos-muertos"],
        queryFn: () => tiempoMuertoService.getTiemposCurso(),
        subscribe: tiempoMuertoWsService.onEnCurso,
    });