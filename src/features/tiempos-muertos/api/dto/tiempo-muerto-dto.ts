export interface TiempoMuertoDto {
  id: number
  maquina: string
  categoria: string
  descripcion: string
  fechaInicioParo: string
  fechaFinParo?: string | null
  enCurso?: boolean
  duracionSegundos?: number
  fechaCreacion?: string
}