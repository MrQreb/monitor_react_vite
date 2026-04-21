import { BadgeBoolean, SortableHeader } from '@/components/common/DataTable';
import type { UsuarioResponseDto } from '@/subsystems/usuarios/api/features/usuarios/dto';
import type { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { baseUrl } from '@/config/base-url-env.config';
import { ActionButton } from './ActionButton';
import { cn } from '@/lib/utils';

const iniciales = (nombre: string) =>
  nombre
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const columns: ColumnDef<UsuarioResponseDto>[] = [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <ActionButton id={row.original.id} />
    ),
  },

  {
    accessorKey: "nombreCompleto",
    meta: { label: "Usuario" },
    header: ({ column }) => (
      <SortableHeader column={column} title="Usuario" />
    ),
    cell: ({ row }) => {
      const isInactive = !row.original.estaActivo;

      return (
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`${baseUrl}/${row.original?.urlImagen}`}
              alt={row.original.nombreCompleto}
              className={cn(
                isInactive && "grayscale"
              )}
            />
            <AvatarFallback
              className={cn(
                "text-xs font-semibold bg-primary/10 text-primary",
                isInactive && "grayscale"
              )}
            >
              {iniciales(row.original.nombreCompleto)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span
              className={cn(
                "font-medium text-sm",
                isInactive && "text-muted-foreground"
              )}
            >
              {row.original.nombreCompleto}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "correo",
    meta: { label: "Correo" },
    header: "Correo",
    enableHiding: true,
    cell: ({ row }) => {
      const isInactive = !row.original.estaActivo;

      return (
        <a
          href={`mailto:${row.original.correo}`}
          className={cn(
            "text-sm",
            !isInactive && "text-primary hover:underline",
            isInactive && "text-muted-foreground pointer-events-none"
          )}
        >
          {row.original.correo}
        </a>
      );
    },
  },

  {
    accessorKey: "turno",
    meta: { label: "Turno" },
    header: "Turno",
    cell: ({ row }) => {
      const isInactive = !row.original.estaActivo;

      return (
        <span
          className={cn(
            "text-sm",
            isInactive && "text-muted-foreground"
          )}
        >
          {row.original.turno}
        </span>
      );
    },
  },

  {
    accessorKey: "estaActivo",
    meta: { label: "Estado" },
    header: "Estado",
    cell: ({ row }) => {
      return (
        <BadgeBoolean
          value={row.original.estaActivo}
          textTrue="Activo"
          textFalse="Inactivo"
        />
      );
    },
  },

  {
    accessorKey: "fechaCreacion",
    meta: { label: "Creación" },
    header: ({ column }) => (
      <SortableHeader column={column} title="Registro" />
    ),
    cell: ({ row }) => {
      const isInactive = !row.original.estaActivo;

      return (
        <span
          className={cn(
            "text-xs text-muted-foreground",
            isInactive && "opacity-70"
          )}
        >
          {new Date(row.original.fechaCreacion).toLocaleDateString()}
        </span>
      );
    },
  },

  {
    accessorKey: "planta",
    meta: { label: "Planta" },
    header: ({ column }) => (
      <SortableHeader column={column} title="Planta" />
    ),
    cell: ({ row }) => {
      const isInactive = !row.original.estaActivo;

      return (
        <span
          className={cn(
            "text-muted-foreground",
            isInactive && "opacity-70"
          )}
        >
          {row.original.planta}
        </span>
      );
    },
  },
];