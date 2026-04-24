import type { ProduccionDiariaDto, ProduccionDiariaHoraDto } from "../dto";

export interface IProduccionWSService {
  /** Websocket del produccion diaria de apptags */
  onProduccionDiaria(
    callback: (data: ProduccionDiariaDto[]) => void,
  ): () => void;
  /** Websocket del produccion diaria de apptags */
  onProduccionPorHora(
    callback: (data: ProduccionDiariaHoraDto[]) => void,
  ): () => void;
}
