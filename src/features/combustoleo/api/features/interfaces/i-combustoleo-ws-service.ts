import type { CombustoleoDto } from "../dto/combustoleo-dto";

export interface ICombustoleoWSService {

  onCombustoleoPlanta1(
    callback: (data: CombustoleoDto[]) => void
  ): () => void;

   onCombustoleoPlanta3(
    callback: (data: CombustoleoDto[]) => void
  ): () => void;

}