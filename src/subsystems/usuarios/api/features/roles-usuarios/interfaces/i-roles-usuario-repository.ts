export interface IRolesUsuarioRepository{
    addRoleToUsuario(usuarioId:number, rolId:number): Promise<any>;
};