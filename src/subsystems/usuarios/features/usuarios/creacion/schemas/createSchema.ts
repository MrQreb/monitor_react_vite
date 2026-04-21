import * as z from 'zod';

/**
 * Esquema de validacion de creacion de usuario
 */
export const createSchema = z.object({
  nombreCompleto: z
  .string("Debes llear el nombre completo")
  .min(5, "Minimo 5 caracteres")
  .max(100, "Maximo 100 caracteres"),

  usuario: z
    .string("Debes llenar el nombre de usuario")
    .min(4, "Minimo 4 caracteres"),

  contrasena: z
    .string("Debes llenar la contraseña")
    .min(6, "Minimo 6 caracteres"),

  correo: z
    .string()
    .optional()
    .nullable(),

  imagen: z.instanceof(File).nullable().optional(),

  turno: z.number().positive(),

  plantaId: z
    .number("Planta obligatoria")
    .positive("Planta obligatoria"),
});


export type CreateUsuarioForm = z.infer<typeof createSchema>;