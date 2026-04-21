import { useForm } from "@tanstack/react-form"
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
import { createPlantaShcema } from "../../schemas/createPlantaSchema"
import { ImageCard, Image } from "@/components/common/ImageCard/ImageCard"
import { useCreatePlanta } from '../../hooks/useCreatePlanta';
export function CrearPlantaPage() {

    const { mutateAsync } = useCreatePlanta();

    const form = useForm({
        defaultValues: {
            nombre: "",
        },
        validators: {
            onSubmit: createPlantaShcema,
        },

        onSubmit: async ({ value }) => {
            try {
                await mutateAsync(value);
                console.log(await mutateAsync(value))
                toast.success("Planta creada correctamente");
                form.reset();
            } catch (error) {
                toast.error("Error al crear la planta");
                console.error(error);
            }
        }

    })


    return (

        <section className="w-full h-screen">

            <div className="flex justify-center h-auto">

                <Card className="w-full sm:max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Planta</CardTitle>
                        <CardDescription>
                            Dar de alta una planta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>


                        {/* Imagen */}
                        <ImageCard className="bg-transparent">
                            <Image
                                src="/assets/usuarios/building.svg"
                                alt="planta"
                                className="w-[45%]"
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
                                                <FieldLabel htmlFor={field.name}>Nombre de la planta</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    placeholder="Nombre de la planta"
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
