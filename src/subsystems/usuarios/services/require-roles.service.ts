import { useUsuarioStore } from "@/shared/store/usuario.store";
import { redirect } from "@tanstack/react-router";
import type { Role } from "../routes/ROLES";


/**
 * Verifica los permisos del sistema de usaurios
 * - Verifica los roles para proteger las rutas.
 * - Filtra el menu de navegacion del sistema dinamicamente, en base a los roles.
 */
export class RequireRolesService {

    /**
     * Obtener el usuario
     */
    private get usuario() {
        const { usuario } = useUsuarioStore.getState();

        if (!usuario || !usuario.sistemaUsuariosDto) {
            throw redirect({ to: "/" });
        }

        return usuario;
    }

    /**
     * Obtienes los roles normailizados
     */
    private get rolesUsuario(): string[] {
        return this.usuario.sistemaUsuariosDto.roles?.map(r =>
            r.nombre.toLowerCase()
        ) ?? [];
    }

    /** Permite ver si tiene los accesos */
    private hasAccess(rolesPermitidos?: Role[]): boolean {
        if (!rolesPermitidos || rolesPermitidos.length === 0) return true;

        return rolesPermitidos.some(role =>
            this.rolesUsuario.includes(role.toLowerCase())
        );
    }

    /** Verifica los roles en las rutas */
    verifyRoles(rolesPermitidos: Role[]): boolean {
        if (!this.hasAccess(rolesPermitidos)) {
            throw redirect({ to: "/sin-permisos" });
        }

        return true;
    }

    /** Filtra el sidebar de usaurios en base a sus roles */
    filterNavigation<T extends { rolesPermitidos?: Role[]; items?: T[] }>(
        items: T[]
    ): T[] {

        return items
            .map(item => {
                const children = item.items
                    ? this.filterNavigation(item.items)
                    : [];

                const canAccess = this.hasAccess(item.rolesPermitidos);

                if (!canAccess && children.length === 0) {
                    return null;
                }

                return {
                    ...item,
                    items: children
                };
            })
            .filter(Boolean) as T[];
    }
}