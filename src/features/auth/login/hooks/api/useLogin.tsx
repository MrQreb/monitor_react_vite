import { useMutation } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
// import { autenticacionService } from "@/subsystems/usuarios/api/features/autenticacion/instances/autenticacion-instance"
// import type { LoginDto } from "@/subsystems/usuarios/api/features/autenticacion/dto/login-dto"
import { useUsuarioStore } from "@/shared/store/usuario.store"
import { useNavigate } from "@tanstack/react-router"

export function useLogin() {
  const { setUsuario, setIsAuthenticated } = useUsuarioStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => autenticacionService.login(data),
    onSuccess: (data) => {
      setUsuario(data);
      setIsAuthenticated(true);
    },
    onError: (error: any) => {
      toast.error(error.message || "No se pudo iniciar sesión"); 
    },
  });

  const form = useForm({
    defaultValues: {
      usuario: "",
      contrasena: "",
    } satisfies LoginDto,
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return { form, isLoading: mutation.isPending || form.state.isSubmitting };
}