import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { produccionService, produccionWsService } from '../../api/features/instances/produccion-instances';

/** Custoom hook permite obtener la produccion diaria */
export const useProduccionDiaria = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-produccion-diaria"],
        queryFn: () => produccionService.getProduccionDiaria(),
        subscribe: produccionWsService.onProduccionDiaria
    });


/** Custoom hook permite obtener la produccion diaria por hora */
export const useProduccionDiaraHora = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-produccion-diaria-hora"],
        queryFn: () => produccionService.getProduccionPorHora(),
        subscribe: produccionWsService.onProduccionPorHora,
    });