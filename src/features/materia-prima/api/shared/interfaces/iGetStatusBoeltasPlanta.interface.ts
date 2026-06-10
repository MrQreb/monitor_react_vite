import type { GetEstatusBoletasPlantaQuery } from "../queries/getEstatusBoletasPlanta.query";
import type { GetEstatusBoletasPlantaResponse } from "../responses/getEstatusBoletasPlantasResponse.responserespoonse";

/** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta. */
export interface IGetEstatusBoletasPlanta {
  
    /** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta.
     * @param  GetEstatusBoletasPlantaQuery
     * @returns Promise<GetEstatusBoletasPlantaResponse[]>
     */
  executeAsync(query: GetEstatusBoletasPlantaQuery): Promise<GetEstatusBoletasPlantaResponse[]>;
}
