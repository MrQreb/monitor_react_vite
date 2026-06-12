export interface QueryBoletasPlanta {
  fechaBusqueda: EstatusBoletasFechas;
  planta: number;
}

interface EstatusBoletasFechas {
  fechaInicio: string;
  fechaFin: string;
}
