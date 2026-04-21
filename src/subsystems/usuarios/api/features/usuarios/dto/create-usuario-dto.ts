export interface CreateUsuarioDto {
  nombreCompleto: string;
  usuario: string;        
  contrasena: string;     
  correo?: string | null;
  imagen?: File | null;
  turno: number;
  plantaId: number;
}