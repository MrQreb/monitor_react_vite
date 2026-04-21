import { plantaCrudService } from "@/subsystems/usuarios/api/features/planta/instances/planta-crud-instance";
import { useMutation } from "@tanstack/react-query"

export const useCreatePlanta = () => {
  return useMutation({
    mutationFn: plantaCrudService.create
  });
}