import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery"
import { temperaturaService, temperatuWsService } from "../../api/features/instances/temperaturas-instances"

export const useTemperaturasTunel2Planta3 = () => {
    return useRealtimeQuery({
        queryKey: ['temperaturas-planta-3'],
        queryFn: () => temperaturaService.getTemperaturasTunel2Planta3(),
        subscribe: temperatuWsService.onTemperaturasTunel2Planta3,
    });
}

