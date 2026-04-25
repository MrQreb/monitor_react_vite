import type { TiempoMuertoDto } from "../dto/tiempo-muerto-dto";

export interface ITiempoMuertoService {

  /** Permite obtener los tiempos muertos en curso */
  getTiemposCurso(): Promise<TiempoMuertoDto[]>;
  /** Permite obtener los tiempos muertos finalizados */
  getTiemposFinalizados(): Promise<TiempoMuertoDto[]>;
}