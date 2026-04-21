import type { CreateMultipliRolesUsuarioDto } from '@/subsystems/usuarios/api/features/roles-usuarios/dto/create-multipli-roles-usuario-dto';
import { rolesUsuarioInstance } from '@/subsystems/usuarios/api/features/roles-usuarios/instances/roles-usuario-instance';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query'
import { assingRolesSchema } from '../schemas/assignRolesSchema';

/** Custoom hook que permite la insersion de los roles del sistema de usuarios */
export const useCreateRolesUsuarios = () => {
    const mutation = useMutation({
        mutationFn: (data: CreateMultipliRolesUsuarioDto) => rolesUsuarioInstance.replaceRoles(data),
    });

    const form = useForm({
        defaultValues: {
            usuarioId: 0,
            rolesId: [] as number[],
        },
        validators: {
            //@ts-ignore
            onSubmit: assingRolesSchema
        },
        onSubmit: async ({ value }) => {
            await mutation.mutateAsync(value);
        },


    });

    return { form, mutation };
}
