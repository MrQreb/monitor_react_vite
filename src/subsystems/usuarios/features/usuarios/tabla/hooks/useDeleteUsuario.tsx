import { usuarioCrudService } from "@/subsystems/usuarios/api/features/usuarios/instances/usuario-crud-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook para eliminar un usuario.
 *
 * Incluye:
 * - Eliminación optimista (se quita del UI antes de la respuesta)
 * - Rollback automático si falla
 * - Notificación al completar
 *
 * @returns Mutación de React Query
 *
 * @example
 * const deleteUsuario = useDeleteUsuario();
 * deleteUsuario.mutate(id);
 */
export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    /** Llamada a la API para eliminar */
    mutationFn: (id: number) => usuarioCrudService.delete(id),

    /** Se ejecuta cuando la operación es exitosa */
    onSuccess: () => {
      toast.warning("Usuario eliminado.");
    },

    /** Actualización optimista */
    onMutate: async (id: number) => {
      
      // Cancelar queries para evitar conflictos
      await queryClient.cancelQueries({ queryKey: ["usuarios-tabla"] });

      // Guardar estado actual para posible rollback
      const previousData = queryClient.getQueriesData({
        queryKey: ["usuarios-tabla"],
      });

      // Remover usuario del cache
      queryClient.setQueriesData(
        { queryKey: ["usuarios-tabla"] },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.filter((u: any) => u.id !== id),
          };
        }
      );

      return { previousData };
    },

    /** Si falla, restaurar estado anterior */
    onError: (_error, _id, context) => {
      if (!context?.previousData) return;

      context.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
};