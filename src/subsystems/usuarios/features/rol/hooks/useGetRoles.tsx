import { rolCrudInstance } from "@/subsystems/usuarios/api/features/roles/instances/rol-crud-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
    const { ...query } = useQuery(
        {
            queryKey: ['roles-usuario-usuarios'],
            queryFn: async () => await rolCrudInstance.getAll(),

        }
    );

    return {...query};
}
