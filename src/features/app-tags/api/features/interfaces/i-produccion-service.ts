
import type { ProduccionDiariaDto, ProduccionDiariaHoraDto } from "../dto";
export interface IProduccionService {
  /** Obtiene la produccion diara de apptags */
  getProduccionDiaria(): Promise<ProduccionDiariaDto[]>;
  /** Obtiene la produccion diara pero por hora de apptags */
  getProduccionPorHora(): Promise<ProduccionDiariaHoraDto[]>;
}
