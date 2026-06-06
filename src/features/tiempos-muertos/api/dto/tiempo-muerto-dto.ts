export interface TiempoMuertoDto {
  id: number;
  maquina: string;
  maquinaId: number;
  areaId: number;
  area: string;
  categoria: string;
  descripcion: string;
  fechaInicioParo: string;
  fechaFinParo: string | null;
  enCurso: boolean;
  duracionSegundos: number;
  fechaCreacion: string;
}
