/** Como lucen datos del evento de finalizacion */
export type TiempoMuertoFinalizadoEvent = {
  maquinaId: number;
  fechaFinParo: string;
  duracionSegundos: number;
};