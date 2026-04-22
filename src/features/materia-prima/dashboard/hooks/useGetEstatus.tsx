
import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { materiaPrimaService, materiaWsPrimaService } from "../../api/features/instances/materia-prima-instances";

/** Custoom hooks para la data de los boletas materia prima */
export const useEstatusPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["planta-1-estatus"],
        queryFn: () => materiaPrimaService.getEstatusPlanta1(),
        subscribe: materiaWsPrimaService.onEstatusPlanta1,
    });


/** Custoom hooks para la data de los boletas materia prima */
export const useEstatusPlanta3 = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-estatus"],
        queryFn: () => materiaPrimaService.getEstatusPlanta3(),
        subscribe: materiaWsPrimaService.onEstatusPlanta3,
    });