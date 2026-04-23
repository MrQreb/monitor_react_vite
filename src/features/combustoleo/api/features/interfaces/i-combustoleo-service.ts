import type { CombustoleoDto } from "../dto/combustoleo-dto";


export interface ICombustoleoService {
  
  getCombustoleoPlanta1(): Promise<CombustoleoDto[]>;
  getCombustoleoPlanta3(): Promise<CombustoleoDto[]>;
}
