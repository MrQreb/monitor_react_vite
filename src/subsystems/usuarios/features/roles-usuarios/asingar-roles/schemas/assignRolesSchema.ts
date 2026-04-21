import z from "zod";

export const assingRolesSchema = z.object({
    usuarioId: z.number("El usuario es obligatorio."),
    rolesId: z.array(z.number(), "Selecciona los roles")
});

export type assingRolesSchema = z.infer<typeof assingRolesSchema>;