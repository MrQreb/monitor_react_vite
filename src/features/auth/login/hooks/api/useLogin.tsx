import { useMutation } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useUsuarioStore } from "@/shared/store/usuario.store"
import { useNavigate } from "@tanstack/react-router"
import type { LoginDto } from "@/features/auth/api/dto/login-dto"
import { loginService } from "@/features/auth/api/instances/instance"

export function useLogin() {
  const { setUsuario, setIsAuthenticated } = useUsuarioStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => loginService.login(data),
    onSuccess: (data) => {
      setUsuario(data);
      setIsAuthenticated(true);
      navigate({
        to:'/menu',
      });
      toast.success(`Bienvenido`);
    },
    onError: (error: any) => {
      toast.error(error.message || "No se pudo iniciar sesión"); 
    },
  });

  const form = useForm({
    defaultValues: {
      nombreUsuario: "",
      contrasena: "",
    } satisfies LoginDto,
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return { form, isLoading: mutation.isPending || form.state.isSubmitting };
}