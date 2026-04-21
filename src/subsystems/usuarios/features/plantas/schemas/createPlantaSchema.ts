import * as z from 'zod';
export const createPlantaShcema = z.object({
    nombre: z
        .string()
        .min(5, "El nombre debe tener 4 caracteres.")
        .max(50, "El nombre puede tener maximo 50 caracteres"),
});
