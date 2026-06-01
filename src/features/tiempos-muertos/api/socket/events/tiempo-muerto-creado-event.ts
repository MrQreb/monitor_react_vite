/** Como lucen datos del evento de creacion */
export type TiempoMuertoCreadoEvent = {
  id: number;
  maquinaId: number;
  maquina: string;
  categoria: string;
  descripcion: string;
  fechaInicioParo: string;
};
