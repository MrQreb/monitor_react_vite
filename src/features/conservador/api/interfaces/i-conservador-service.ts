import type { CarryOverCajasDto } from "../dto/carry-over-cajas-dto";
import type { CarryOverDto } from "../dto/carry-over-dto";

export interface IConservadorService{
    /** Permite obtener la lista del carry over de la planta 1 */
    getCarryOverPlata1(): Promise<CarryOverDto>;
    /** Permite obtener la lista del carry over de la planta 3 */
    getCarryOverPlata3(): Promise<CarryOverDto>;
    /** Permite obtener las cajas del carry over */
    getCarryOverCajasPlanta3(): Promise<CarryOverCajasDto>;
}