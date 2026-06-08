import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";

export interface ITiempoMuertoService {
  
  /** Permite obtener los tiempos muertos en curso */
  getTiemposCursoAsync(): Promise<TiempoMuertoDto[]>;

  /** Permite obtener los tiempos muertos en curso en base id en especifico */
  getTiemposCursoByAreaIdAsync(idArea:number): Promise<TiempoMuertoDto[]>;

  /** Permite obtener los tiempos muertos finalizados */
  getTiemposFinalizadosAsync(): Promise<TiempoMuertoDto[]>;
}
