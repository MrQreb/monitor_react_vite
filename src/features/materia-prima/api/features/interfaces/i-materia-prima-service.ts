import type {
  CajasEsperadasDto,
  ViajeEstatusDto,
  ViajeProgramadoDto,
} from "../dto";

export interface IMateriaService {
  /** Obtiene los datos del rancho, producto y cajas programados */
  getBoletasPlanta1(): Promise<Partial<ViajeProgramadoDto[]>>;
  /** Obtiene los datos del rancho, producto y cajas programados */
  getBoletasPlanta3(): Promise<Partial<ViajeProgramadoDto[]>>;
  
  /** Obtiene el folio, esatus, centro corte, horarios y ranchos de la mateteria prima */
  getEstatusPlanta1(): Promise<Partial<ViajeEstatusDto[]>>;
  /** Obtiene el folio, esatus, centro corte, horarios y ranchos de la mateteria prima */
  getEstatusPlanta3(): Promise<Partial<ViajeEstatusDto[]>>;
  
  /** Obtiene compartivo de cajas reales y cajas estimadas */
  getCajasPlanta1(): Promise<Partial<CajasEsperadasDto>>;
  /** Obtiene compartivo de cajas reales y cajas estimadas */
  getCajasPlanta3(): Promise<Partial<CajasEsperadasDto>>;
}
