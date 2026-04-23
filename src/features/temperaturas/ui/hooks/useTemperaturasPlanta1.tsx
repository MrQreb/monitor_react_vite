import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery"
import { temperaturaService, temperatuWsService } from "../../api/features/instances/temperaturas-instances"

export const useTemperaturasPlanta1 = () => {
    return useRealtimeQuery({
        queryKey: ['temperaturas-planta-1'],
        queryFn: () => temperaturaService.getTemperaturasPlanta1(),
        subscribe: temperatuWsService.onTemperaturasPlanta1,
    });
}

