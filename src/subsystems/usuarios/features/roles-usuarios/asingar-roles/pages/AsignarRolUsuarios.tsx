import { useEffect, useState } from "react";
import {
  Field,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsuarioCreadoStore } from "@/shared/store/usuario-creado.store";
import { ImageCard, Image } from "@/components/common/ImageCard/ImageCard";
import { TabsSistemas } from '../components/TabsSistemas';
import { useCreateRolesUsuarios } from "../hooks/useCreateRolesUsuarios";
import { useGetUsuarioWithRolesQuery } from "../hooks/useGetUsuarioWithRolesQuery";
import { UsuarioCard } from '../components/UsuarioCard';
import { ModalSelect } from "@/components/common/SelectableModal/components/ModalSelect";
import { RolItem } from "../components/RolItem";
import { SelectedItemsCard } from "@/components/common/SelectableModal/components/SelectedItemsCard";
import { useSelectableModal } from "@/components/common/SelectableModal/hooks/useSelectableModal";
import { useGetRoles } from "../../../rol/hooks/useGetRoles";
import { toast } from "sonner";
import { UsuarioNotFound } from "../components/UsuarioNotFound";
import { baseUrl } from "@/config/base-url-env.config";
import { SkeletonForm } from "../components/SkeletonForm";

type Rol = {
  id: number;
  nombre: string;
  descripcion?: string;
};

export function AsignRolesPage() {
  const [openModal, setOpenModal] = useState(false);

  const { usuario } = useUsuarioCreadoStore();

  const { data: dataRoles, isPending: isPendingRoles } = useGetRoles();
  const { data: usuarioWithRolesData, isLoading: usuarioWithRolesLoading } = useGetUsuarioWithRolesQuery(Number(usuario?.id));

  const { form, mutation } = useCreateRolesUsuarios();

  useEffect(() => {
    if (mutation.isSuccess) toast.success('Roles actualizados');
  }, [mutation.isSuccess])



  const {
    selected: rolesSeleccionados,
    toggle: toggleRol,
    setAll: setRolesSeleccionados,
  } = useSelectableModal<Rol>({
    items: dataRoles,
    initialSelectedIds: usuarioWithRolesData?.roles?.map((r: any) => r.id),
  });


  const handleAsignarRoles = () => {
    form.setFieldValue("usuarioId", Number(usuario?.id));
    form.setFieldValue(
      "rolesId",
      rolesSeleccionados.map((rol) => rol.id)
    );
    form.handleSubmit();
  }

  if (!usuario) return (
    <section className="w-[40%] h-screen bg m-auto">
      <UsuarioNotFound />
    </section>
  )

  if (usuarioWithRolesLoading) return (
    <SkeletonForm />
  )

  return (
    <section className="w-full h-screen">

      <div className="flex justify-center mb-5">
        <TabsSistemas />
      </div>

      <div className="flex justify-center h-auto">
        <Card className="w-full sm:max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex">
              Asignar roles
            </CardTitle>
            <CardDescription>
              Darle los roles del sistema de usaurios
            </CardDescription>
          </CardHeader>

          <CardContent>

            {/* Imagen del formulario */}
            <ImageCard variant="flat" className="bg-white w-[80%] m-auto mb-12">
              <Image
                src="/assets/usuarios/safe.svg"
                alt="planta"
                className="w-[45%]"
              />
            </ImageCard>

            {/* Usuario */}
            <UsuarioCard
              name={usuario.nombreCompleto}
              userName={usuario.usuario}
              imageUrl={`${baseUrl}/${usuario?.urlImagen}`}
              disabledButton={isPendingRoles}
              onClick={() => setOpenModal(true)}
            />

            {usuarioWithRolesLoading &&
              (
                <div className="flex w-fit items-center gap-4">
                  <Skeleton className="size-10 shrink-0 rounded-full" />
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              )
            }

            {/* Modal de los roles */}
            <ModalSelect<Rol>
              open={openModal}
              onOpenChange={setOpenModal}
              items={dataRoles ?? []}
              selected={rolesSeleccionados}
              onToggle={toggleRol}
              title="Roles del sistema"
              description="Selecciona los roles para el usuario"
              getSearchValue={(rol) => rol.nombre}
              ItemComponent={RolItem}
            />

            {/* Roles seleccionados */}
            <SelectedItemsCard<Rol>
              items={rolesSeleccionados}
              onRemove={toggleRol}
              onClear={() => setRolesSeleccionados([])}
              getLabel={(rol) => rol.nombre}
              title="Roles asignados"
              emptyText="No hay roles seleccionados"
            />

          </CardContent>

          <CardFooter>
            <Field className="gap-6" orientation="horizontal">
              <Button
                onClick={handleAsignarRoles}
                disabled={rolesSeleccionados.length === 0}
                type="button"
                form="create"
                className="cursor-pointer"
              >
                Crear
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}