import z from "zod";

/** Validaciones del formulario de creacion de rol */
export const createRolSchema = z.object({
    nombre: z
        .string("Es obligatorio")
        .min(4, "Minimo 4 caracteres")
        .max(30, "Maximo 30 caracteres"),

    descripcion: z
        .string()
        .max(60, "Maximo 60 caracteres")
        .or(z.literal(""))
})