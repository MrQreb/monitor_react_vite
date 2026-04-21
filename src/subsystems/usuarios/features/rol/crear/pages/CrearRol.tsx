import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ImageCard, Image } from "@/components/common/ImageCard/ImageCard"
import { useEffect } from 'react';
import { useCreateRol } from "../hooks/useCreateRol"

export function CrearRol() {
    const { form, mutation } = useCreateRol();

    useEffect(() => {
        if (mutation.isSuccess) toast.success(`Rol creado`);

        if (mutation.isError) toast.warning(`Rol no se a creado`);

    }, [mutation.isSuccess, mutation.isError]);

    return (
        <section className="w-full h-screen">

            <div className="flex justify-center h-auto">

                <Card className="w-full sm:max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Rol</CardTitle>
                        <CardDescription>
                            Dar rol para el sistema de usuarios
                        </CardDescription>
                    </CardHeader>
                    <CardContent>


                        {/* Imagen */}
                        <ImageCard className="bg-gray-100">
                            <Image
                                src="/assets/usuarios/code.svg"
                                alt="planta"
                                className="w-[35%]"
                            />
                        </ImageCard>
                        {/* Formulario */}
                        <form
                            id="create"
                            onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit()
                            }}
                        >
                            <FieldGroup>
                                <form.Field
                                    name="nombre"
                                    children={(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}
                                            >
                                                <FieldLabel htmlFor={field.name}>Rol</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    placeholder="Usuarios"
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                                <form.Field
                                    name="descripcion"
                                    children={(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}
                                            >
                                                <FieldLabel htmlFor={field.name}>Descripcion</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    placeholder="Permite crear, eliminar y modificar usuarios"
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                            </FieldGroup>
                        </form>


                    </CardContent>

                    <CardFooter>
                        <Field className="gap-6" orientation="horizontal">
                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Limpiar
                            </Button>
                            <Button type="submit" form="create">
                                Crear
                            </Button>
                        </Field>
                    </CardFooter>

                </Card>


            </div>



        </section>

    )
}
