import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Shield, TrashIcon, UserCheck, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog/ConfirmDialog";
import { usuarioCrudService } from "@/subsystems/usuarios/api/features/usuarios/instances/usuario-crud-instance";
import { useUsuarioCreadoStore } from "@/shared/store/usuario-creado.store";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteUsuario } from "../hooks/useDeleteUsuario";
import { useToggleUsuario } from "../hooks/useEnebleUsuario";
import { PREFIX_USUARIOS, ROUTES_USUARIOS } from "@/subsystems/usuarios/routes/ROUTES_USUARIOS";

export function ActionButton({ id }: { id: number }) {
    const { setUsuario } = useUsuarioCreadoStore();
    const navigate = useNavigate();
    const toggleUsuario = useToggleUsuario();

    const deleteUsuario = useDeleteUsuario();

    const handleDelete = () => {
        deleteUsuario.mutate(id);
    };

    const handleDisable = () => {
        toggleUsuario.mutate({
            id: id,
            activo: false,
        });
    };

    const handleEnable = () => {
        toggleUsuario.mutate({
            id: id,
            activo: true,
        });
    };

    const handleModifyPermissions = async () => {
        const usuario = await usuarioCrudService.getByIdAsync(id);
        if (!usuario) return;

        setUsuario(usuario);
        navigate({
            to: `${PREFIX_USUARIOS}/${ROUTES_USUARIOS.asignarRoles}`,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Ellipsis className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuGroup>

                    {/* Permisos */}
                    <ConfirmDialog
                        onConfirm={handleModifyPermissions}
                        title="Modificar roles de los sistemas"
                        description="Podras cambiar los permisos de los distintos sistemas del usaurio."
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                Permisos
                            </DropdownMenuItem>
                        }
                    />

                    {/* Activar */}
                    <DropdownMenuSeparator />
                    <ConfirmDialog
                        onConfirm={handleEnable}
                        title="Activar usuario"
                        description="Esta acción activara el usaurio. Tendra acceso a los sistemas en base a sus permisos."
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                disabled={deleteUsuario.isPending}
                            >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activar
                            </DropdownMenuItem>
                        }
                    />


                    {/* Eliminar */}
                    <DropdownMenuSeparator />
                    <ConfirmDialog
                        onConfirm={handleDelete}
                        title="Eliminar usuario"
                        description="Esta acción eliminará el usuario permanentemente."
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-destructive"
                                disabled={deleteUsuario.isPending}
                            >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Eliminar
                            </DropdownMenuItem>
                        }
                    />

                    {/* Desactivar */}
                    <DropdownMenuSeparator />
                    <ConfirmDialog
                        onConfirm={handleDisable}
                        title="Desactivar usuario"
                        description="Esta acción desactiva el usuario. Ya no podra acceder a los sistemas"
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-destructive"
                            >
                                <UserRoundX className="mr-2 h-4 w-4" />
                                Desactivar
                            </DropdownMenuItem>
                        }
                    />

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}