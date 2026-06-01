import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";

export type TiempoMuertoFinalizadoRef = Pick<TiempoMuertoDto, "maquinaId">;

export interface ITiempoMuertoWSService {
  onEnCurso(callback: (data: TiempoMuertoDto[]) => void): () => void;

  onEnFinilizada(callback: (data: TiempoMuertoFinalizadoRef[]) => void): () => void;
}
