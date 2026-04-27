import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";

export interface ITiempoMuertoWSService {
  onEnCurso(callback: (data: TiempoMuertoDto[]) => void): () => void;

  onEnFinilizada(callback: (data: TiempoMuertoDto[]) => void): () => void;
}
