import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery"
import { temperaturaService, temperatuWsService } from "../../api/features/instances/temperaturas-instances"


export const useTemperaturasCedis1 = () => {
    return useRealtimeQuery({
        queryKey: ['temperaturas-cedis-1'],
        queryFn: () => temperaturaService.getTemperaturasCedis1(),
        subscribe: temperatuWsService.onTemperaturasCedis1,
    });
}

