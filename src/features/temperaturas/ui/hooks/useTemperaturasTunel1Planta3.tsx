import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery"
import { temperaturaService, temperatuWsService } from "../../api/features/instances/temperaturas-instances"


export const useTemperaturasTunel1Planta3 = () => {
    return useRealtimeQuery({
        queryKey: ['temperaturas-planta-3'],
        queryFn: () => temperaturaService.getTemperaturasTunel1Planta3(),
        subscribe: temperatuWsService.onTemperaturasTunel1Planta3,
    });
}

