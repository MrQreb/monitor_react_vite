
import { useRealtimeQuery } from "@/shared/hooks/useRealTimeQuery";
import { materiaPrimaService, materiaWsPrimaService } from "../../api/features/instances/materia-prima-instances";

/** Custoom hook que permite obtener las cajas reales y estimadas de los productos*/
export const useGetCajasPlanta1 = () =>
    useRealtimeQuery({
        queryKey: ["planta-1-cajas"],
        queryFn: () => materiaPrimaService.getCajasPlanta1(),
        subscribe: materiaWsPrimaService.onCajasPlanta1,
    });


/** Custoom hook que permite obtener las cajas reales y estimadas de los productos*/
export const useGetCajasPlanta3 = () =>
    useRealtimeQuery({
        queryKey: ["planta-3-cajas"],
        queryFn: () => materiaPrimaService.getCajasPlanta3(),
        subscribe: materiaWsPrimaService.onCajasPlanta3,
    });