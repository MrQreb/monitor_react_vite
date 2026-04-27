import type { CarryOverCajasDto } from "../dto/carry-over-cajas-dto";
import type { CarryOverDto } from "../dto/carry-over-dto";

/** Interface encargado del websockets del conservador */
export interface IConservadorWsService {

  /** Websocket para obtener el carry over de planta 1 */
  onCarryOverPlanta1(callback: (data: CarryOverDto[]) => void): () => void;

  /** Websocket para obtener el carry over en cajas de planta 3 */
  onCarryOverCajasPlanta3(
    callback: (data: CarryOverCajasDto[]) => void,
  ): () => void;
  
  /** Websocket para obtener el carry over de planta 3 */
  onCarryOverPlanta3(callback: (data: CarryOverDto[]) => void): () => void;
}
