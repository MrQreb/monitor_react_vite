import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";

export interface TiempoMuertoEvents {
  "tiempo-muerto:creado": TiempoMuertoDto[] | TiempoMuertoDto;
  "tiempo-muerto:finalizado": TiempoMuertoDto[] | TiempoMuertoDto;
}