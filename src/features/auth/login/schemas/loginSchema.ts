import { z } from "zod";

export const loginSchema = z.object({
  usuario: z.string()
    .nonempty("El nombre de usuario es requerido"),
  contrasena: z.string()
    .min(3, "La contraseña es requerida")
});

export type loginSchema = z.infer<typeof loginSchema>;