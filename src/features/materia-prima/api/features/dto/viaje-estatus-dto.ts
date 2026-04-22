export interface ViajeEstatusDto  {
  producto: string;
  folio: string;
  status_embarque: string;
  ticket: string;
  fecha_alta: string;
  hora_alta: string
  hora_evaluacion: string;
  hora_impresion: string;
  centro_corte: string;
  fecha_envio: string | null;
  fecha_evaluador: string;
  hora_pesaje: string;
  rancho: string;
  estatus: string;
}
