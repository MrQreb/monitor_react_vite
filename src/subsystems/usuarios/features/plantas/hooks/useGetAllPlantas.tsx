import { plantaCrudService } from "@/subsystems/usuarios/api/features/planta/instances/planta-crud-instance";
import { useQuery } from "@tanstack/react-query"

export const useGetAllPlantas = () => {
  
    return useQuery({
        queryKey: ['allPlantas'],
        queryFn: async () => {
            
            return await plantaCrudService.getAll()
        }
    });



}
