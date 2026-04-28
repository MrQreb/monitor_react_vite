
import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { materiaPrimaService, materiaWsPrimaService } from "../../api/features/instances/materia-prima-instances";

/** Custoom hooks para la data de los viajes de materia prima */
export const useBoletasPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["planta-1-boletas"],
        queryFn: () => materiaPrimaService.getBoletasPlanta1(),
        subscribe: materiaWsPrimaService.onBoletasPlanta1,
    });

/** Custoom hooks para la data de los viajes de materia prima */
export const useBoletasPlanta3 = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-boletas"],
        queryFn: () => materiaPrimaService.getBoletasPlanta3(),
        subscribe: materiaWsPrimaService.onBoletasPlanta3,
    });