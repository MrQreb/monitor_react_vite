export interface GetUsuarioWithRolesResponse{
    
    id:number;
    nombre:string;
    usuario:string;
    planta:string;
    urlImagen?:string;
    roles:RolesDto[];
}

interface RolesDto{
    id:number;
    nombre:string;
    descripcion?:string;
}

