import { rolesUsuarioQueriesInstance } from '@/subsystems/usuarios/api/features/roles-usuarios/instances/roles-usuario-queries-instance';
import { useQuery } from '@tanstack/react-query'

export const useGetUsuarioWithRolesQuery = (usuarioId:number) => {
  const query  = useQuery({
    queryKey:['usuario-with-roles'],
    queryFn:async () => rolesUsuarioQueriesInstance.getUsuarioWithRolesQuery(usuarioId),
    enabled:!!usuarioId
  })
  return query;
}
