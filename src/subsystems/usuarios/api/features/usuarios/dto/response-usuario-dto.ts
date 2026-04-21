export interface UsuarioResponseDto {
    id: number;
    nombreCompleto: string;
    usuario: string;
    contrasena: string;
    correo?: string;
    turno: number;
    urlImagen?:string;
    estaActivo: boolean;
    estaEliminado: boolean;
    fechaCreacion: Date;
    fechaModificacion?: Date;
    planta?: string;
    plantaId?: string;
}