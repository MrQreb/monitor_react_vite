import { usuarioCrudService } from '@/subsystems/usuarios/api/features/usuarios/instances/usuario-crud-instance';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createSchema } from '../schemas/createSchema';
import { toast } from 'sonner';
import { ApiError } from '@/shared/services/api-error';
import { useUsuarioCreadoStore } from '@/shared/store/usuario-creado.store';
import type { UsuarioResponseDto } from '@/subsystems/usuarios/api/features/usuarios/dto';

export const useCreateUsuario = () => {

  const { setUsuario } = useUsuarioCreadoStore();

  const { isPending, mutateAsync, isSuccess, } = useMutation({
    mutationFn: usuarioCrudService.create,
    onSuccess: (data:UsuarioResponseDto) => {
    setUsuario(data);
  }
  });

  const form = useForm({
    defaultValues: {
      nombreCompleto: "",
      usuario: "",
      contrasena: "",
      correo: "",
      turno: 1,
      plantaId: 0,
      imagen: null as File | null,
    },

    validators: {
      //@ts-ignore
      onSubmit: createSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const parsed = createSchema.parse(value);

        await mutateAsync(parsed);

        toast.success("Usuario creado correctamente");
        form.reset();
      } catch (error: unknown) {
        console.error(error);

        toast.error(ApiError.getMessage(error));
      }
    },
  });

  return {
    isPending,
    form,
    isSuccess
  };
};