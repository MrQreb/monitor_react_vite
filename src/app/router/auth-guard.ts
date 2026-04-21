import { redirect } from "@tanstack/react-router";
import { useUsuarioStore } from "@/shared/store/usuario.store";

/**
 * Verifica si el usuario tiene sesión activa
 */
export const requireAuth = () => {
  const { usuario } = useUsuarioStore.getState();

  if (!usuario) {
    throw redirect({
      to: "/sin-permisos",
    });
  }
};