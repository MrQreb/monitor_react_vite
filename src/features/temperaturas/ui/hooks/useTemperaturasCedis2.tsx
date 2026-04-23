import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery"
import { temperaturaService, temperatuWsService } from "../../api/features/instances/temperaturas-instances"

export const useTemperaturasCedis2 = () => {
    return useRealtimeQuery({
        queryKey: ['temperaturas-cedis-2'],
        queryFn: () => temperaturaService.getTemperaturasCedis2(),
        subscribe: temperatuWsService.onTemperaturasCedis2,
    });
}

