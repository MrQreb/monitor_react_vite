
import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { materiaPrimaService, materiaWsPrimaService } from "../../api/features/instances/materia-prima-instances";

export const useGetViajesEstatus = () => {

    const planta1 = useRealtimeQuery({
        queryKey: ["estatus", "planta1"],
        queryFn: () => materiaPrimaService.getEstatusPlanta1(),
        subscribe: materiaWsPrimaService.onEstatusPlanta1,
    });

    const planta3 = useRealtimeQuery({
        queryKey: ["estatus", "planta3"],
        queryFn: () => materiaPrimaService.getEstatusPlanta3(), 
        subscribe: materiaWsPrimaService.onEstatusPlanta3,
    });

    return { planta1, planta3 };
};
