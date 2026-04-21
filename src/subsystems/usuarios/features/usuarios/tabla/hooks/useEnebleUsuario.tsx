import { usuarioCrudService } from "@/subsystems/usuarios/api/features/usuarios/instances/usuario-crud-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook para activar o desactivar un usuario.
 *
 * @example
 * const toggle = useToggleUsuario();
 * toggle.mutate({ id: 1, activo: true });
 */
export const useToggleUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      activo
        ? usuarioCrudService.enable(id)
        : usuarioCrudService.disabled(id),

    onSuccess: (_data, variables) => {
      toast.success(
        variables.activo ? "Usuario activado" : "Usuario desactivado"
      );
    },

    onMutate: async ({ id, activo }) => {
      await queryClient.cancelQueries({ queryKey: ["usuarios-tabla"] });

      const previousData = queryClient.getQueriesData({
        queryKey: ["usuarios-tabla"],
      });

      queryClient.setQueriesData(
        { queryKey: ["usuarios-tabla"] },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.map((u: any) =>
              u.id === id ? { ...u, estaActivo: activo } : u
            ),
          };
        }
      );

      return { previousData };
    },

    onError: (_error, _vars, context) => {
      if (!context?.previousData) return;

      context.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
};