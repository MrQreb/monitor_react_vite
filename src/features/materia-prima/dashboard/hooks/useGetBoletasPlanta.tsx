
import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { materiaPrimaService, materiaWsPrimaService } from "../../api/features/instances/materia-prima-instances";

export const useBoletasPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["boletas", "planta1"],
        queryFn: () => materiaPrimaService.getBoletasPlanta1(),
        subscribe: materiaWsPrimaService.onBoletasPlanta1,
    });

export const useEstatusPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["estatus", "planta1"],
        queryFn: () => materiaPrimaService.getEstatusPlanta1(),
        subscribe: materiaWsPrimaService.onEstatusPlanta1,
    });