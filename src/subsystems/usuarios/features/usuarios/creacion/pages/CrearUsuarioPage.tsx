import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageCard, Image } from "@/components/common/ImageCard/ImageCard";
import { useGetAllPlantas } from "../../../plantas/hooks/useGetAllPlantas";
import { CustoomComboBox } from "@/components/common/ComboBox/Normal/CustoomComboBox";
import type { PlantaReponseDto } from "@/subsystems/usuarios/api/features/planta/dto";
import { FileUploadBar } from "@/components/common/FileUpload/FileUploadBar";
import { useCreateUsuario } from "../hooks/useCreateUsuario";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PREFIX_USUARIOS, ROUTES_USUARIOS } from "@/subsystems/usuarios/routes/ROUTES_USUARIOS";

export function CrearUsuarioPage() {

  const { data: dataPlantas } = useGetAllPlantas();
  const { form, isPending, isSuccess } = useCreateUsuario();

  const navigate = useNavigate();

  //Manda a formulario de roles en caso de cree exitosamente.
  useEffect(() => {
    
    if(isSuccess){
      navigate({
        to:`${PREFIX_USUARIOS}/${ROUTES_USUARIOS.asignarRoles}`
      });
    }

  }, [isSuccess]);
  

  return (
    <section className="w-full h-screen">
      <div className="flex justify-center h-auto">
        <Card className="w-full sm:max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Usuario
            </CardTitle>
            <CardDescription>
              Dar de alta un usuario nuevo
            </CardDescription>
          </CardHeader>

          <CardContent>

            {/* Imagen del formulario */}
            <ImageCard variant="bordered" className="bg-white m-auto mb-5">
              <Image
                src="/assets/usuarios/add-user.svg"
                alt="planta"
                className="w-[35%]"
              />
            </ImageCard>

            {/* Formulario */}
            <form
              id="create"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>

                {/* Nombre */}
                <form.Field name="nombreCompleto">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Nombre completo
                        </FieldLabel>

                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          aria-invalid={isInvalid}
                          placeholder="Nombre completo"
                        />

                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors}
                          />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Nombre de usuario */}
                <form.Field name="usuario">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Usuario</FieldLabel>

                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="usuario123"
                        />

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="contrasena">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Contraseña</FieldLabel>

                        <Input
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="dsadasdsa"
                        />

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Correo */}
                <form.Field name="correo">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Correo
                        </FieldLabel>

                        <Input
                          id={field.name}
                          type="email"
                          value={field.state.value ?? null}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                          }}
                          aria-invalid={isInvalid}
                          placeholder="correo@ejemplo.com"
                        />

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Turno */}
                <form.Field name="turno">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Turno
                        </FieldLabel>

                        <Select
                          defaultValue="1"
                          value={field.state.value?.toString()}
                          onValueChange={(value) =>
                            field.handleChange(Number(value))
                          }
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue placeholder="Seleccione turno" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}

                </form.Field>


                {/* Planta */}
                <form.Field name="plantaId">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Planta
                        </FieldLabel>

                        <CustoomComboBox<PlantaReponseDto>
                          items={dataPlantas ?? []}
                          showClear
                          value={field.state.value ? String(field.state.value) : undefined}
                          onChange={(value) => {
                            field.handleChange(value ? Number(value) : 0);
                          }}
                          valueField="id"
                          fields={[
                            {
                              valueField: "nombre",
                              type: "text",
                            },
                          ]}
                        />

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="imagen">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Imagen</FieldLabel>

                        <FileUploadBar
                          maxFiles={1}
                          maxSizeMB={2}
                          accept=".png,.jpg,.jpeg"
                          value={field.state.value ? [field.state.value] : []}
                          onChange={(files) => field.handleChange(files[0] ?? null)}
                        />

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter>
            <Field className="gap-6" orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Limpiar
              </Button>

              <Button
                type="submit"
                form="create"
                disabled={isPending}
              >
                {isPending ? "Creando..." : "Crear"}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}