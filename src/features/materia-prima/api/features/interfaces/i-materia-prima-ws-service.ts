import type {
  ViajeProgramadoDto,
  ViajeEstatusDto,
  CajasEsperadasDto,
} from "../dto";

export interface IMateriaPrimaWSService {
  onBoletasPlanta1(
    callback: (data: ViajeProgramadoDto[]) => void
  ): () => void;

  onEstatusPlanta1(
    callback: (data: ViajeEstatusDto[]) => void
  ): () => void;

  onCajasPlanta1(
    callback: (data: CajasEsperadasDto) => void
  ): () => void;

  onBoletasPlanta3(
    callback: (data: ViajeProgramadoDto[]) => void
  ): () => void;

  onEstatusPlanta3(
    callback: (data: ViajeEstatusDto[]) => void
  ): () => void;

  onCajasPlanta3(
    callback: (data: CajasEsperadasDto) => void
  ): () => void;
}