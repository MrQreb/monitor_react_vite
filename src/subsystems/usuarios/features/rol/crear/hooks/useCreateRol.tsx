import { z } from "zod";
import { createRolSchema } from "../schemas/createRolSchema";
import { useMutation } from "@tanstack/react-query";
import { rolCrudInstance } from "@/subsystems/usuarios/api/features/roles/instances/rol-crud-instance";
import { useForm } from "@tanstack/react-form";

type FormValues = z.infer<typeof createRolSchema>;


/**
 * Custoom hook que permite la creacion de roles.
 * Permite crear un rol en base nombre y descripcion 
 */
export const useCreateRol = () => {
  const mutation = useMutation({
    mutationFn: rolCrudInstance.create,
  });

  const form = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
    } as FormValues,
    validators: {
      onSubmit: createRolSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      form.reset();
    },
  });

  return {
    form,
    mutation
  };
};